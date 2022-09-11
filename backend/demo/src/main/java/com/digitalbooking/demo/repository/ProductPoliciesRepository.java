package com.digitalbooking.demo.repository;

import com.digitalbooking.demo.model.ProductPolicies;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductPoliciesRepository extends JpaRepository<ProductPolicies, Long> {
}
