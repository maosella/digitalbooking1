package com.digitalbooking.demo.service;

import com.digitalbooking.demo.model.Favourite;
import com.digitalbooking.demo.model.dto.FavouriteDTO;
import com.digitalbooking.demo.repository.FavouriteRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FavouriteService {
    @Autowired
    FavouriteRepository favouriteRepository;
    @Autowired
    ObjectMapper mapper;

    public void addFavourite(FavouriteDTO favouriteDTO) {
        favouriteRepository.save(mapper.convertValue(favouriteDTO, Favourite.class));
    }

    public void deleteFavourite(FavouriteDTO favouriteDTO) {
        favouriteRepository.deleteByProductIdAndUserId(favouriteDTO.getProduct(), favouriteDTO.getUser());
    }
}
