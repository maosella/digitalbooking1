package com.digitalbooking.demo.model.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class CategoryDTO {
    private Long id;
    private String title;
    private String description;
    private String imageUrl;
    private long ammount;

    public CategoryDTO() {
    }

    public String getTitle() {
        return title;
    }
    public String getDescription() {
        return description;
    }
    public String getImageUrl() {
        return imageUrl;
    }
    public Long getId() {
        return id;
    }
    public long getAmmount() {
        return ammount;
    }

    public void setTitle(String title) {
        this.title = title;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public void setAmmount(long ammount) {
        this.ammount = ammount;
    }
}
