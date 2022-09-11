package com.digitalbooking.demo.security.model;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;

public class MainUser implements UserDetails {
    private final Long id;
    private final String name;
    private final String surname;
    private final String email;
    private final String password;
    private final String city;
    private final String role;
    private final GrantedAuthority authorities;

    public MainUser(Long id, String name, String surname, String email, String password, GrantedAuthority authority, String city, String role) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.password = password;
        this.authorities = authority;
        this.city = city;
        this.role = role;
    }

    public static MainUser build(User user) {
        Role role = user.getRole();
        GrantedAuthority authority =
                new SimpleGrantedAuthority(role.getName());
        return new MainUser(user.getId(), user.getName(), user.getSurname(), user.getEmail(), user.getPassword(), authority, user.getCity(), user.getRole().getName());
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getSurname() {
        return surname;
    }

    public String getEmail() {
        return email;
    }

    public String getCity() {
        return city;
    }

    public String getRole() {
        return role;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singletonList(authorities);
    }

    @Override
    public String getPassword() {
        return this.password;
    }

    @Override
    public String getUsername() {
        return this.email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
