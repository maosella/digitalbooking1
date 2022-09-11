package com.digitalbooking.demo.controller;

import com.digitalbooking.demo.model.dto.PolicyDTO;
import com.digitalbooking.demo.service.PolicyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/policies")
public class PolicyController {
    @Autowired
    PolicyService policyService;

    @GetMapping
    public ResponseEntity<List<PolicyDTO>> getAll() {
        return ResponseEntity.ok(policyService.getAll());
    }
}
