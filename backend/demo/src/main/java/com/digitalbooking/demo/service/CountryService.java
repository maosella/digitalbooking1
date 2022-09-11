package com.digitalbooking.demo.service;

import com.digitalbooking.demo.model.Country;
import com.digitalbooking.demo.repository.CountryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CountryService {

    private final CountryRepository countryRepository;

    @Autowired
    public CountryService(CountryRepository countryRepository) {
        this.countryRepository = countryRepository;
    }

    public Country addCountry(Country country) {
        return countryRepository.save(country);
    }

    public List<Country> listCountries() {
        return countryRepository.findAll();
    }
}
