package com.digitalbooking.demo.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.PutObjectResult;
import com.digitalbooking.demo.exceptions.BadRequestException;
import com.digitalbooking.demo.exceptions.ResourceNotFoundException;
import com.digitalbooking.demo.model.Image;
import com.digitalbooking.demo.model.dto.ImageDTO;
import com.digitalbooking.demo.repository.ImageRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ImageService {
    @Autowired
    ImageRepository imageRepository;
    @Autowired
    private ObjectMapper mapper;
    @Autowired
    private AmazonS3 s3;


    public Image upLoadImage(MultipartFile multipartFile, Long id) throws IOException {
        ObjectMetadata objectMetadata = new ObjectMetadata();
        objectMetadata.setContentLength(multipartFile.getSize());
        String urlRandom = UUID.randomUUID().toString().concat(multipartFile.getOriginalFilename());
        PutObjectRequest putObjectRequest = new PutObjectRequest("doom-bucket-g5/images",urlRandom,multipartFile.getInputStream(),objectMetadata).withCannedAcl(CannedAccessControlList.PublicRead);
        PutObjectResult putObjectResult = s3.putObject(putObjectRequest);
        return imageRepository.save(new Image("https://doom-bucket-g5.s3.us-east-2.amazonaws.com/images/" + urlRandom, id));
    }

    public List<ImageDTO> listCategories() {
        List<Image> images = imageRepository.findAll();
        List<ImageDTO> imagesDTOS = new ArrayList<>();
        for (Image c :
                images) {
            ImageDTO cdto = mapper.convertValue(c, ImageDTO.class);
            imagesDTOS.add(cdto);
        }
        return imagesDTOS;
    }

    public ImageDTO findImageById(Long id) throws BadRequestException, ResourceNotFoundException {
        if (id == null)
            throw new BadRequestException("Id can't be null");
        Optional<Image> image = imageRepository.findById(id);
        if (image.isEmpty())
            throw new ResourceNotFoundException("Can't find image with id: " + id);
        return mapper.convertValue(image, ImageDTO.class);
    }


    public String deleteImage(Long id) throws BadRequestException, ResourceNotFoundException {
        if (id == null)
            throw new BadRequestException("Id can't be null");
        if (imageRepository.findById(id).isEmpty())
            throw new ResourceNotFoundException("Can't find image with id: " + id);
        imageRepository.deleteById(id);
        return "Image with id: " + id + " has been updated.";
    }
}
