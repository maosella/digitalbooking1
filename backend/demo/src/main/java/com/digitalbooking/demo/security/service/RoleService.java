package com.digitalbooking.demo.security.service;

import com.digitalbooking.demo.security.model.Role;
import com.digitalbooking.demo.security.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class RoleService {


    private final RoleRepository roleRepository;

    @Autowired
    public RoleService(final RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    public void createRole(Role role) {
        roleRepository.save(role);
    }


    public Optional<Role> findByName(String rolName) {
        return roleRepository.findByName(rolName);
    }


    public Role addRole(Role role) {
        return null;
    }


    public List<Role> listRoles() {
        return roleRepository.findAll();
    }
}