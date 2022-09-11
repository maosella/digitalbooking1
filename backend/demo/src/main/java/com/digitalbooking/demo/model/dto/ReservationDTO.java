package com.digitalbooking.demo.model.dto;

import com.digitalbooking.demo.model.Product;
import com.digitalbooking.demo.security.model.User;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.text.SimpleDateFormat;
import java.time.LocalTime;
import java.util.Date;

@JsonIgnoreProperties(ignoreUnknown = true)
public class ReservationDTO {
    private String start_date;
    private String end_date;
    private Long user;
    private Long product;
    private LocalTime checkIn;
    private String city;

    public ReservationDTO() {
    }

    public String getStart_date() {
        return start_date;
    }

    public void setStart_date(Date start_date) {
        this.start_date = new SimpleDateFormat("yyyy-MM-dd").format(start_date);
    }

    public String getEnd_date() {
        return end_date;
    }

    public void setEnd_date(Date end_date) {
        this.end_date = new SimpleDateFormat("yyyy-MM-dd").format(end_date);
    }

    public Long getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user.getId();
    }

    public Long getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product.getId();
    }

    public LocalTime getCheckIn() {
        return checkIn;
    }

    public void setCheckIn(LocalTime checkIn) {
        this.checkIn = checkIn;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

}
