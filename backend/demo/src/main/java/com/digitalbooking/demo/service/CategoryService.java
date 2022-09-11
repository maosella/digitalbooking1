package com.digitalbooking.demo.service;

import com.digitalbooking.demo.exceptions.BadRequestException;
import com.digitalbooking.demo.exceptions.ResourceNotFoundException;
import com.digitalbooking.demo.model.Category;
import com.digitalbooking.demo.model.dto.CategoryDTO;
import com.digitalbooking.demo.repository.CategoryRepository;
import com.digitalbooking.demo.repository.ProductRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {
    @Autowired
    CategoryRepository categoryRepository;
    @Autowired
    ProductRepository productRepository;
    @Autowired
    private ObjectMapper mapper;

    public CategoryDTO addCategory(CategoryDTO category) throws BadRequestException {
        if (category == null)
            throw new BadRequestException("Didn't get a category to save");
        categoryRepository.save(mapper.convertValue(category, Category.class));
        return category;
    }

    public List<CategoryDTO> listCategories() {
        List<Category> categories = categoryRepository.findAll();
        List<CategoryDTO> categoriesDTOS = new ArrayList<>();
        for (Category c :
                categories) {
            CategoryDTO cdto = mapper.convertValue(c, CategoryDTO.class);
            cdto.setAmmount(productRepository.countByCategory(c));
            categoriesDTOS.add(cdto);
        }
        return categoriesDTOS;
    }

    public CategoryDTO findCategoryById(Long id) throws BadRequestException, ResourceNotFoundException {
        if (id == null)
            throw new BadRequestException("Id can't be null");
        Optional<Category> category = categoryRepository.findById(id);
        if (category.isEmpty())
            throw new ResourceNotFoundException("Can't find category with id: " + id);
        return mapper.convertValue(category, CategoryDTO.class);
    }

    public CategoryDTO findCategoryByTitle(String title) throws BadRequestException, ResourceNotFoundException {
        if (title == null)
            throw new BadRequestException("Title can't be null");
        List<Category> category = categoryRepository.findByCategoryTitle(title);
        if (category.isEmpty())
            throw new ResourceNotFoundException("Can't find category titled: " + title);
        return mapper.convertValue(category.get(0), CategoryDTO.class);
    }

    public String editCategory(CategoryDTO category) throws ResourceNotFoundException {
        List<Category> cat = categoryRepository.findByCategoryTitle(category.getTitle());
        if (cat.isEmpty())
            throw new ResourceNotFoundException("Can't find any category named: " + category.getTitle());
        if (cat.size() > 1)
            throw new ResourceNotFoundException("There are too many categories with that name");
        categoryRepository.save(cat.get(0));
        return "Category: " + category.getTitle() + " has been updated.";
    }

    public String deleteCategory(Long id) throws BadRequestException, ResourceNotFoundException {
        if (id == null)
            throw new BadRequestException("Id can't be null");
        if (categoryRepository.findById(id).isEmpty())
            throw new ResourceNotFoundException("Can't find category with id: " + id);
        categoryRepository.deleteById(id);
        return "Category with id: " + id + " has been updated.";
    }
}
