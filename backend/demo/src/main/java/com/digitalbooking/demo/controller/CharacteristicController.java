package com.digitalbooking.demo.controller;

import com.digitalbooking.demo.exceptions.BadRequestException;
import com.digitalbooking.demo.exceptions.ResourceNotFoundException;
import com.digitalbooking.demo.model.dto.CharacteristicDTO;
import com.digitalbooking.demo.service.CharacteristicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/characteristics")
public class CharacteristicController {
    @Autowired
    private CharacteristicService characteristicService;

    @PostMapping
    public ResponseEntity<CharacteristicDTO> addCharacteristic(@RequestBody CharacteristicDTO caracteristic) throws BadRequestException {
        return ResponseEntity.ok(characteristicService.addCharacteristic(caracteristic));
    }

    @GetMapping
    public ResponseEntity<List<CharacteristicDTO>> listCharacteristics() {
        return ResponseEntity.ok(characteristicService.listCharacteristics());
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> editCharacteristic(@RequestBody CharacteristicDTO characteristic) throws ResourceNotFoundException {
        return ResponseEntity.ok(characteristicService.editCharacteristic(characteristic));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCharacteristic(@PathVariable(value = "id") Long id) throws BadRequestException, ResourceNotFoundException {
        return ResponseEntity.ok(characteristicService.deleteCharacteristic(id));
    }
}
