package com.digitalbooking.demo.controller;

import com.digitalbooking.demo.model.dto.FavouriteDTO;
import com.digitalbooking.demo.service.FavouriteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/favourites")
public class FavouriteController {
    @Autowired
    FavouriteService favouriteService;

    @PostMapping
    public ResponseEntity<String> addFavourite(@RequestBody FavouriteDTO favouriteDTO) {
        favouriteService.addFavourite(favouriteDTO);
        return ResponseEntity.ok("Added Product to Favourites");
    }

    @DeleteMapping
    public ResponseEntity<String> deleteFavourite(@RequestBody FavouriteDTO favouriteDTO) {
        favouriteService.deleteFavourite(favouriteDTO);
        return ResponseEntity.ok("Deleted Product from Favourites");
    }
}
