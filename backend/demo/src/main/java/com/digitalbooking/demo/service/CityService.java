package com.digitalbooking.demo.service;

import com.digitalbooking.demo.exceptions.BadRequestException;
import com.digitalbooking.demo.model.City;
import com.digitalbooking.demo.model.dto.CityDTO;
import com.digitalbooking.demo.repository.CityRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CityService {
    @Autowired
    private CityRepository cityRepository;
    @Autowired
    private ObjectMapper mapper;

    public CityDTO addCity(CityDTO city) throws BadRequestException {
        if (city == null)
            throw new BadRequestException("Didn't get city to save");
        cityRepository.save(mapper.convertValue(city, City.class));
        return city;
    }

    public List<CityDTO> listCities() {
        List<City> cities = cityRepository.findAll();
        List<CityDTO> citiesDTOS = new ArrayList<>();
        for (City c :
                cities) {
            CityDTO cdto = mapper.convertValue(c, CityDTO.class);
            citiesDTOS.add(cdto);
        }
        return citiesDTOS;
    }

}
