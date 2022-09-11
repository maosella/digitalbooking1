package com.digitalbooking.demo.model.dto;

import com.digitalbooking.demo.model.Product;
import com.digitalbooking.demo.security.model.User;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class FavouriteDTO {
    private Long product;
    private Long user;

    public FavouriteDTO() {
    }

    public Long getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product.getId();
    }

    public Long getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user.getId();
    }
}
