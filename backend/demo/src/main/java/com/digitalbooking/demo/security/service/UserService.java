package com.digitalbooking.demo.security.service;

import com.digitalbooking.demo.exceptions.BadRequestException;
import com.digitalbooking.demo.security.DTO.RegisterUserDTO;
import com.digitalbooking.demo.security.DTO.UserDTO;
import com.digitalbooking.demo.security.enums.RoleName;
import com.digitalbooking.demo.security.model.*;
import com.digitalbooking.demo.security.repository.AccountValidationTokenRepository;
import com.digitalbooking.demo.security.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class UserService {

    private final UserRepository userRepository;
    private final AccountValidationTokenRepository accountValidationTokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final RoleService roleService;
    private final EmailSenderService emailSender;

    @Autowired
    public UserService(final UserRepository userRepository,
                       final AccountValidationTokenRepository accountValidationTokenRepository,
                       final PasswordEncoder passwordEncoder,
                       final RoleService roleService,
                       final EmailSenderService emailSender) {
        this.userRepository = userRepository;
        this.accountValidationTokenRepository = accountValidationTokenRepository;
        this.passwordEncoder = passwordEncoder;
        this.roleService = roleService;
        this.emailSender = emailSender;
    }

    public void createUser(RegisterUserDTO registerUserDTO) throws MessagingException {
        User user = new User(registerUserDTO.getName(), registerUserDTO.getSurname(), registerUserDTO.getEmail(), passwordEncoder.encode(registerUserDTO.getPassword()));
        Role role = roleService.findByName(RoleName.client.toString()).get();
        if (registerUserDTO.getRole().equals("admin"))
            role = roleService.findByName(RoleName.admin.toString()).get();
        user.setRole(role);
        userRepository.save(user);
        createValidationAccountToken(user.getId(), registerUserDTO.getIp());
        emailSender.sendConfirmationEmail(user);
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    public void updateEnabled(boolean enabled, ConfirmationRequest confirmationRequest) throws BadRequestException {
        if (accountValidationTokenRepository.findByUserIdAndIp(confirmationRequest.getId(), confirmationRequest.getIp()) != null) {
            userRepository.updateEnabled(enabled, confirmationRequest.getId());
        } else {
            throw new BadRequestException("Credentials not valid");
        }
    }

    public User findByEmail(String email) {
        return userRepository.findByEmail(email).get();
    }

    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    public UserDTO getUserCurrent(MainUser userCurrent) {
        return new UserDTO(userCurrent.getId(), userCurrent.getName(),
                userCurrent.getSurname(), userCurrent.getEmail(), userCurrent.getAuthorities());
    }

    public List<User> listUsers() {
        return null;
    }

    public User addUser(User user) {
        return null;
    }

    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }

    private void createValidationAccountToken(Long id, String ip) {
        AccountValidationToken validationToken = new AccountValidationToken();
        validationToken.setUserId(id);
        validationToken.setIp(ip);
        accountValidationTokenRepository.save(validationToken);
    }

}