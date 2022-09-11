package com.digitalbooking.demo.security.DTO;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

public class RegisterUserDTO {
    @NotEmpty(message = "name must not be empty.")
    private String name;
    @NotEmpty(message = "surname must not be empty.")
    private String surname;
    @NotEmpty(message = "email must not be empty.")
    @Email(message = "email must be in the correct format.")
    private String email;
    @Size(min = 6, message = "password should have at least 6 characters.")
    private String password;

    private String role;

    private String ip;

    public String getIp() {
        return ip;
    }

    public void setIp(String ip) {
        this.ip = ip;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
