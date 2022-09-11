package com.digitalbooking.demo.controller;

import com.digitalbooking.demo.exceptions.BadRequestException;
import com.digitalbooking.demo.exceptions.ResourceNotFoundException;
import com.digitalbooking.demo.model.dto.*;
import com.digitalbooking.demo.service.ImageService;
import com.digitalbooking.demo.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotBlank;
import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/products")
public class ProductController {

    @Autowired
    public ProductService productService;
    @Autowired
    public ImageService imageService;

    @PostMapping
    public ResponseEntity<String> addProduct(@RequestPart @NotBlank AddProductDTO product, @RequestParam @NotBlank List<MultipartFile> images) throws BadRequestException, IOException {
        productService.addProduct(product,images);
        return ResponseEntity.ok("Product added successfully");
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductDTO> returnProduct(@PathVariable Long id) throws BadRequestException, ResourceNotFoundException {
        return ResponseEntity.ok(productService.findProductById(id));
    }

    @GetMapping("/name/{title}")
    public ResponseEntity<ProductDTO> returnProduct(@PathVariable String title) throws BadRequestException, ResourceNotFoundException {
        return ResponseEntity.ok(productService.findProductByTitle(title));
    }

    @GetMapping
    public ResponseEntity<List<ProductDTO>> productList() {
        return ResponseEntity.ok(productService.productList());
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> editProduct(@RequestBody ProductDTO product) throws ResourceNotFoundException {
        return ResponseEntity.ok(productService.editProduct(product));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable Long id) throws BadRequestException, ResourceNotFoundException {
        return ResponseEntity.ok(productService.deleteProduct(id));
    }

    @GetMapping("/home")
    public ResponseEntity<List<HomeProductDTO>> randomProductList(@RequestParam(required = false) String category,
                                                                  @RequestParam(required = false) String city,
                                                                  @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") Date startDate,
                                                                  @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") Date endDate,
                                                                  @RequestParam Long user) throws BadRequestException, ResourceNotFoundException {
        return ResponseEntity.ok(productService.homeProducts(category, city, startDate, endDate, user));
    }

    @GetMapping("/reservation/{id}")
    public ResponseEntity<?> reservationInfo(@PathVariable Long id)  {
        try {
            return ResponseEntity.ok(productService.reservationProduct(id));
        } catch (BadRequestException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @GetMapping("/favourites/{id}")
    public ResponseEntity<List<HomeProductDTO>> favouriteProducts(@PathVariable Long id) {
        return ResponseEntity.ok(productService.favouriteProducts(id));
    }

}

