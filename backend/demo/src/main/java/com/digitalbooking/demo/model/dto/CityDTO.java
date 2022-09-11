package com.digitalbooking.demo.model.dto;

import com.digitalbooking.demo.model.Country;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class CityDTO {
    private Long id;
    private String name;
    private double latitude;
    private double longitude;
    private String country;

    public CityDTO() {

    }

    public String getName() { return name; }
    public double getLatitude() { return latitude; }
    public double getLongitude() { return longitude; }
    public String getCountry() { return country; }
    public Long getId() {
        return id;
    }

    public void setName(String name) { this.name = name; }
    public void setLatitude(double latitude) { this.latitude = latitude; }
    public void setLongitude(double longitude) { this.longitude = longitude; }
    public void setCountry(Country country) { this.country = country.getName(); }
    public void setId(Long id) {
        this.id = id;
    }
}
