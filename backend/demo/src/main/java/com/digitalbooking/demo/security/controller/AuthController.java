package com.digitalbooking.demo.security.controller;

import com.digitalbooking.demo.exceptions.BadRequestException;
import com.digitalbooking.demo.security.DTO.JwtDTO;
import com.digitalbooking.demo.security.DTO.LoginUserDTO;
import com.digitalbooking.demo.security.DTO.RegisterUserDTO;
import com.digitalbooking.demo.security.JWT.JwtProvider;
import com.digitalbooking.demo.security.JWT.JwtTokenFilter;
import com.digitalbooking.demo.security.model.ConfirmationRequest;
import com.digitalbooking.demo.security.model.MainUser;
import com.digitalbooking.demo.security.model.User;
import com.digitalbooking.demo.security.service.UserService;
import freemarker.template.TemplateException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.io.IOException;

@RestController
@RequestMapping("/auth")
@CrossOrigin
public class AuthController {
    @Autowired
    AuthenticationManager authenticationManager;
    @Autowired
    UserService userService;
    @Autowired
    JwtProvider jwtProvider;
    @Autowired
    JwtTokenFilter jwtTokenFilter;

    @PostMapping(path = "/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody RegisterUserDTO registerUserDTO, HttpServletRequest httpServletRequest) throws MessagingException, TemplateException, IOException {
        if (userService.existsByEmail(registerUserDTO.getEmail())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Email already exists");
        }
        if (registerUserDTO.getIp() == null) {
            registerUserDTO.setIp(httpServletRequest.getRemoteAddr());
        }
        userService.createUser(registerUserDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body("User created successfully");
    }

    @PostMapping(path = "/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginUserDTO loginUserDTO) throws BadRequestException {
        User user = userService.findByEmail(loginUserDTO.getEmail());
        if (!user.isEnabled())
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Account not validated");
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginUserDTO.getEmail(),
                loginUserDTO.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtProvider.generateToken(authentication);
        MainUser userDetails = (MainUser) authentication.getPrincipal();
        JwtDTO jwtDTO = new JwtDTO(userDetails.getId(), userDetails.getName(), userDetails.getSurname(), jwt, userDetails.getUsername(), userDetails.getAuthorities(), userDetails.getCity(), userDetails.getRole());
        return ResponseEntity.ok(jwtDTO);
    }

    @PostMapping(path = "/token")
    public boolean checkToken(HttpServletRequest request) {
        String token = jwtTokenFilter.getToken(request);
        return jwtProvider.validateToken(token);
    }

    @PostMapping(path = "/confirmation")
    public void confirmRegistration(@RequestBody ConfirmationRequest confirmationRequest, HttpServletRequest httpServletRequest) throws BadRequestException {
        if (confirmationRequest.getIp() == null) {
            confirmationRequest.setIp(httpServletRequest.getRemoteAddr());
        }
        userService.updateEnabled(true, confirmationRequest);
    }

}
