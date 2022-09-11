package com.digitalbooking.demo.service;

import com.digitalbooking.demo.exceptions.BadRequestException;
import com.digitalbooking.demo.exceptions.ResourceNotFoundException;
import com.digitalbooking.demo.model.Characteristic;
import com.digitalbooking.demo.model.dto.CharacteristicDTO;
import com.digitalbooking.demo.repository.CharacteristicRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CharacteristicService {
    @Autowired
    CharacteristicRepository characteristicRepository;
    @Autowired
    private ObjectMapper mapper;

    public CharacteristicDTO addCharacteristic(CharacteristicDTO characteristic) throws BadRequestException {
        if (characteristic == null)
            throw new BadRequestException("Didn't get a characteristic to save");
        characteristicRepository.save(mapper.convertValue(characteristic, Characteristic.class));
        return characteristic;
    }

    public List<CharacteristicDTO> listCharacteristics() {
        List<Characteristic> characteristics = characteristicRepository.findAll();
        List<CharacteristicDTO> characteristicsDTOS = new ArrayList<>();
        for (Characteristic c :
                characteristics) {
            CharacteristicDTO cdto = mapper.convertValue(c, CharacteristicDTO.class);
            characteristicsDTOS.add(cdto);
        }
        return characteristicsDTOS;
    }

    public CharacteristicDTO findCharacteristicById(Long id) throws BadRequestException, ResourceNotFoundException {
        if (id == null)
            throw new BadRequestException("Id can't be null");
        Optional<Characteristic> characteristic = characteristicRepository.findById(id);
        if (characteristic.isEmpty())
            throw new ResourceNotFoundException("Can't find characteristic with id: " + id);
        return mapper.convertValue(characteristic, CharacteristicDTO.class);
    }

    public String editCharacteristic(CharacteristicDTO characteristic) throws ResourceNotFoundException {
        Optional<List<Characteristic>> cat = characteristicRepository.findByCharacteristicName(characteristic.getName());
        if (cat.isEmpty())
            throw new ResourceNotFoundException("Can't find any characteristic named: " + characteristic.getName());
        if (cat.get().size() > 1)
            throw new ResourceNotFoundException("There are too many characteristics with that name");
        characteristicRepository.save(cat.get().get(0));
        return "Caracteristic: " + characteristic.getName() + " has been updated.";
    }

    public String deleteCharacteristic(Long id) throws BadRequestException, ResourceNotFoundException {
        if (id == null)
            throw new BadRequestException("Id can't be null");
        if (characteristicRepository.findById(id).isEmpty())
            throw new ResourceNotFoundException("Can't find characteristic with id: " + id);
        characteristicRepository.deleteById(id);
        return "Caracteristic with id: " + id + " has been updated.";
    }
}
