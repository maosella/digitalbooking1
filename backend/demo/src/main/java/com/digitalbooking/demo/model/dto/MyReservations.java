package com.digitalbooking.demo.model.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.text.SimpleDateFormat;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;

@JsonIgnoreProperties(ignoreUnknown = true)
public class MyReservations {

    private String start_date;
    private String end_date;
    private HomeProductDTO product;
    private String checkIn;

    public MyReservations() {}

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

    public HomeProductDTO getProduct() {
        return product;
    }

    public void setProduct(HomeProductDTO product) {
        this.product = product;
    }

    public String getCheckIn() {
        return checkIn;
    }

    public void setCheckIn(LocalTime checkIn) {
        this.checkIn = checkIn.format(DateTimeFormatter.ofPattern("HH:mm"));
    }
}
