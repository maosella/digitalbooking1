package com.digitalbooking.demo.security.repository;

import com.digitalbooking.demo.security.model.AccountValidationToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountValidationTokenRepository extends JpaRepository<AccountValidationToken, Long> {
    AccountValidationToken findByUserIdAndIp(Long id, String ip);
}
