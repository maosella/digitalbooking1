package com.digitalbooking.demo.controller;

import com.digitalbooking.demo.exceptions.BadRequestException;
import com.digitalbooking.demo.exceptions.ResourceNotFoundException;
import com.digitalbooking.demo.model.dto.CategoryDTO;
import com.digitalbooking.demo.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categories")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @PostMapping
    public ResponseEntity<CategoryDTO> addCategory(@RequestBody CategoryDTO category) throws BadRequestException {
        return ResponseEntity.ok(categoryService.addCategory(category));
    }

    @GetMapping
    public ResponseEntity<List<CategoryDTO>> listCategories() {
        return ResponseEntity.ok(categoryService.listCategories());
    }

    @GetMapping("/{title}")
    public ResponseEntity<CategoryDTO> getByTitle(@PathVariable String title) throws BadRequestException, ResourceNotFoundException {
        return ResponseEntity.ok(categoryService.findCategoryByTitle(title));
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> editCategory(@RequestBody CategoryDTO category) throws ResourceNotFoundException {
        return ResponseEntity.ok(categoryService.editCategory(category));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCategory(@PathVariable(value = "id") Long id) throws BadRequestException, ResourceNotFoundException {
        return ResponseEntity.ok(categoryService.deleteCategory(id));
    }
}
