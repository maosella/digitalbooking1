package com.digitalbooking.demo.controller;

import com.amazonaws.services.glacier.transfer.ArchiveTransferManager;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.PutObjectResult;
import com.digitalbooking.demo.exceptions.BadRequestException;
import com.digitalbooking.demo.exceptions.ResourceNotFoundException;
import com.digitalbooking.demo.model.Image;
import com.digitalbooking.demo.model.dto.ImageDTO;
import com.digitalbooking.demo.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/images")

public class ImageController {
    @Autowired
    private ImageService imageService;

    @Autowired
    private AmazonS3 s3;

    @PostMapping("/upload/{id}")
    public Image uploadImage(@RequestParam("file") MultipartFile multipartFile, @PathVariable(value = "id") Long id) throws IOException {
        return imageService.upLoadImage(multipartFile,id );
    }


    @GetMapping
    public ResponseEntity<List<ImageDTO>> listCategories() {
        return ResponseEntity.ok(imageService.listCategories());
    }



    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteImage(@PathVariable(value = "id") Long id) throws BadRequestException, ResourceNotFoundException {
        return ResponseEntity.ok(imageService.deleteImage(id));
    }
}
