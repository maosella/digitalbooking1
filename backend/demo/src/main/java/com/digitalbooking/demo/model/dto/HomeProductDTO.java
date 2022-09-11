package com.digitalbooking.demo.model.dto;

import com.digitalbooking.demo.model.Characteristic;
import com.digitalbooking.demo.model.Image;
import com.digitalbooking.demo.model.Score;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@JsonIgnoreProperties(ignoreUnknown = true)
public class HomeProductDTO {
    private Long id;
    private String title;
    private String description;
    private double latitude;
    private double longitude;
    private CategoryDTO category;
    private CityDTO city;
    private ImageDTO images;
    private final List<CharacteristicDTO> characteristics = new ArrayList<>();
    private int scores;
    private boolean favourite;

    public boolean isFavourite() {
        return favourite;
    }

    public void setFavourite(boolean favourite) {
        this.favourite = favourite;
    }

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
    };

    public HomeProductDTO() {
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

    public ImageDTO getImages() {
        return images;
    }

    public void setImages(Set<Image> images) {
        this.images = new ImageDTO();
        this.images.setId(images.iterator().next().getId());
        this.images.setName(images.iterator().next().getName());
    }

    public List<CharacteristicDTO> getCharacteristics() {
        return this.characteristics;
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
}
