package com.digitalbooking.demo.security.controller;

import com.digitalbooking.demo.security.model.User;
import com.digitalbooking.demo.security.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@CrossOrigin
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping
    public User addUser(@RequestBody User user) {
        return userService.addUser(user);
    }

    @GetMapping
    public List<User> listUsers() {
        return userService.listUsers();
    }

    @GetMapping("/id/{id}")
    public User findById(@PathVariable(value = "id") Long id) {
        return userService.findById(id).get();
    }

}
