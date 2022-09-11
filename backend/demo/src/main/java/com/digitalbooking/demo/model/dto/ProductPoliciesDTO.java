package com.digitalbooking.demo.model.dto;

import com.digitalbooking.demo.model.Policy;
import com.digitalbooking.demo.model.Product;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class ProductPoliciesDTO {
    private Long product;
    private Long policy;
    private boolean allowed;

    public ProductPoliciesDTO() {}

    public Long getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product.getId();
    }

    public Long getPolicy() {
        return policy;
    }

    public void setPolicy(Policy policy) { this.policy = policy.getId(); }

    public boolean isAllowed() {
        return allowed;
    }

    public void setAllowed(boolean allowed) {
        this.allowed = allowed;
    }

}
