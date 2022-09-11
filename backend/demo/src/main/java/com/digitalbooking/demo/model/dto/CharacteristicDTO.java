package com.digitalbooking.demo.model.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class CharacteristicDTO {
    private Long id;
    private String name;
    private String icon_url;

    public CharacteristicDTO() {
    }

    public Long getId() {
        return id;
    }
    public String getName() {
        return name;
    }
    public String getIcon_url() {
        return icon_url;
    }

    public void setId(Long id) {
        this.id = id;
    }
    public void setName(String name) {
        this.name = name;
    }
    public void setIcon_url(String icon_url) {
        this.icon_url = icon_url;
    }
}
