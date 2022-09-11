package com.digitalbooking.demo.security.controller;

import com.digitalbooking.demo.security.model.Role;
import com.digitalbooking.demo.security.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/roles")
@CrossOrigin
public class RoleController {

    @Autowired
    private RoleService roleService;

    @PostMapping
    public Role addRole(@RequestBody Role role) {
        return roleService.addRole(role);
    }

    @GetMapping
    public List<Role> listRoles() {
        return roleService.listRoles();
    }
}
