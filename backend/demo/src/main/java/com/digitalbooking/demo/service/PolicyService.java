package com.digitalbooking.demo.service;

import com.digitalbooking.demo.model.Policy;
import com.digitalbooking.demo.model.dto.PolicyDTO;
import com.digitalbooking.demo.model.dto.PolicyDTO;
import com.digitalbooking.demo.repository.PolicyRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class PolicyService {
    @Autowired
    PolicyRepository policyRepository;
    @Autowired
    ObjectMapper mapper;

    public List<PolicyDTO> getAll() {
        List<Policy> policy = policyRepository.findAll();
        List<PolicyDTO> policyDTOS = new ArrayList<>();
        for (Policy c :
                policy) {
            PolicyDTO p = mapper.convertValue(c, PolicyDTO.class);
            policyDTOS.add(p);
        }
        return policyDTOS;
    }

}
