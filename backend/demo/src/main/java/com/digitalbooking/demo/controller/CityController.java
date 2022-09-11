package com.digitalbooking.demo.controller;

import com.digitalbooking.demo.exceptions.BadRequestException;
import com.digitalbooking.demo.model.dto.CityDTO;
import com.digitalbooking.demo.service.CityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cities")
public class CityController {

    @Autowired
    private CityService cityService;

    @PostMapping
    public ResponseEntity<CityDTO> addCity(@RequestBody CityDTO city) throws BadRequestException {
        return ResponseEntity.ok(cityService.addCity(city));
    }

    @GetMapping
    public ResponseEntity<List<CityDTO>> listCities() {
        return ResponseEntity.ok(cityService.listCities());
    }
}
