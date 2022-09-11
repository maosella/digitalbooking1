package com.digitalbooking.demo.model.dto;

import com.digitalbooking.demo.model.*;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@JsonIgnoreProperties(ignoreUnknown = true)
public class ProductDTO {
    private Long id;
    private String title;
    private String description;
    private double latitude;
    private double longitude;
    private CategoryDTO category;
    private CityDTO city;
    private final List<ImageDTO> images = new ArrayList<>();
    private final List<CharacteristicDTO> characteristics = new ArrayList<>();
    @JsonIgnoreProperties({"product", "user"})
    private final List<ReservationDTO> reservations = new ArrayList<>();
    private final List<PolicyDTO> policies = new ArrayList<>();
    private String checkOut;
    private String cancellation;
    private int scores;

    public int getScores() {
        return scores;
    }

    public void setScores(Set<Score> scores) {
        int sum = 0;
        for (Score s :
                scores) {
            sum += s.getScore();
        }
        this.scores = sum / scores.size();
    }

    public ProductDTO() {
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }

    public List<ImageDTO> getImages() {
        return images;
    }

    public void setImages(Set<Image> images) {
        for (Image i:
                images) {
            ImageDTO id = new ImageDTO();
            id.setId(i.getId());
            id.setName(i.getName());
            this.images.add(id);
        }
    }

    public List<CharacteristicDTO> getCharacteristics() {
        return characteristics;
    }

    public void setCharacteristics(Set<Characteristic> characteristics) {
        for (Characteristic c:
                characteristics) {
            CharacteristicDTO cd = new CharacteristicDTO();
            cd.setId(c.getId());
            cd.setName(c.getName());
            cd.setIcon_url(c.getIcon_url());
            this.characteristics.add(cd);
        }
    }
    public List<ReservationDTO> getReservations() {
        return reservations;
    }

    public void setReservations(Set<Reservation> reservations) {
        for (Reservation r:
                reservations) {
            ReservationDTO rd = new ReservationDTO();
            rd.setStart_date(r.getStart_date());
            rd.setEnd_date(r.getEnd_date());
            rd.setUser(r.getUser());
            rd.setProduct(r.getProduct());
            rd.setCheckIn(r.getCheckIn());
            this.reservations.add(rd);
        }
    }

    public CategoryDTO getCategory() {
        return category;
    }

    public void setCategory(CategoryDTO category) {
        this.category = category;
    }

    public CityDTO getCity() {
        return city;
    }

    public void setCity(CityDTO city) {
        this.city = city;
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
