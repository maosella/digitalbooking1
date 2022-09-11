package com.digitalbooking.demo.model.dto;

import com.digitalbooking.demo.model.*;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@JsonIgnoreProperties(ignoreUnknown = true)
public class AddProductDTO {
    private String title;
    private String description;
    private double latitude;
    private double longitude;
    private String address;
    private Category category;
    private City city;
    private List<Long> characteristics;
    private List<ProductPoliciesDTO> policies;
    private LocalTime checkOut;
    private String cancellation;

    @JsonProperty("category_id")
    private void unpackNested(Long category_id){
        this.category = new Category();
        category.setId(category_id);
    }
    @JsonProperty("city_id")
    private void unpackNestedCity(Long city_id){
        this.city = new City();
        city.setId(city_id);
    }

    // setters
    public void setTitle(String title) {
        this.title = title;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }
    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }
    public void setAddress(String address) {
        this.address = address;
    }
    public void setCategory(Category category) {
        this.category = category;
    }
    public void setCity(City city) {
        this.city = city;
    }
    public void setCharacteristics(List<Long> characteristics) {
        this.characteristics = characteristics;
    }

    // getters
    public String getTitle() {
        return title;
    }
    public String getDescription() {
        return description;
    }
    public double getLatitude() {
        return latitude;
    }
    public double getLongitude() {
        return longitude;
    }
    public String getAddress() {
        return address;
    }
    public Category getCategory() {
        return category;
    }
    public City getCity() {
        return city;
    }
    public Set<Characteristic> getCharacteristics() {
        return this.characteristics.stream()
                .map(Characteristic::new)
                .collect(Collectors.toSet());
    }

    public List<ProductPoliciesDTO> getPolicies() {
        return policies;
    }

    public void setPolicies(List<ProductPoliciesDTO> policies) {
        this.policies = policies;
    }

    public LocalTime getCheckOut() {
        return checkOut;
    }

    public void setCheckOut(LocalTime checkOut) {
        this.checkOut = checkOut;
    }

    public String getCancellation() {
        return cancellation;
    }

    public void setCancellation(String cancellation) {
        this.cancellation = cancellation;
    }
}

