package com.digitalbooking.demo.controller;

import com.digitalbooking.demo.model.Country;
import com.digitalbooking.demo.service.CountryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/countries")

public class CountryController {

    private CountryService countryService;

    @Autowired
    public CountryController() {
    }

    @PostMapping
    public Country addCountry(@RequestBody Country country) {
        return countryService.addCountry(country);
    }

    @GetMapping
    public List<Country> listCountries() {
        return countryService.listCountries();
    }
}
