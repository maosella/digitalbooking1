package com.digitalbooking.demo.model.dto;

import com.digitalbooking.demo.model.ProductPolicies;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@JsonIgnoreProperties(ignoreUnknown = true)
public class ReservationProductDTO {
    private Long id;
    private String title;
    private String city;
    private String address;
    private String category;
    private ImageDTO images;
    private final List<PolicyDTO> policies = new ArrayList<>();
    @JsonIgnoreProperties({"product", "user", "policies.product"})
    private Set<ReservationDTO> reservations;
    private String checkOut;
    private String cancellation;

    public ReservationProductDTO() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public ImageDTO getImages() {
        return images;
    }

    public void setImages(Set<ImageDTO> images) {
        this.images = images.iterator().next();
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(CategoryDTO category) {
        this.category = category.getTitle();
    }

    public String getCity() {
        return city;
    }

    public void setCity(CityDTO city) {
        this.city = city.getName() + ", " + city.getCountry();
    }

    public List<PolicyDTO> getPolicies() {
        return policies;
    }

    public void setPolicies(Set<ProductPolicies> policies) {
        for (ProductPolicies p:
                policies) {
            PolicyDTO pd = new PolicyDTO();
            String name = p.getPolicy().getName();
            pd.setId(p.getId());
            if(!p.isAllowed())
                pd.setName("No " + name);
            else
                pd.setName(name.substring(0,1).toUpperCase() + name.substring(1).toLowerCase());
            pd.setType(p.getPolicy().getType());
            this.policies.add(pd);
        }
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Set<ReservationDTO> getReservations() {
        return reservations;
    }

    public void setReservations(Set<ReservationDTO> reservations) {
        this.reservations = reservations;
    }

    public String getCheckOut() {
        return checkOut;
    }

    public void setCheckOut(LocalTime checkOut) {
        this.checkOut = checkOut.format(DateTimeFormatter.ofPattern("HH:mm"));
    }

    public String getCancellation() {
        return cancellation;
    }

    public void setCancellation(String cancellation) {
        this.cancellation = cancellation;
    }

}
