package com.digitalbooking.demo.service;

import com.digitalbooking.demo.exceptions.BadRequestException;
import com.digitalbooking.demo.exceptions.ResourceNotFoundException;
import com.digitalbooking.demo.model.*;
import com.digitalbooking.demo.model.dto.*;
import com.digitalbooking.demo.repository.*;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class ProductService {
    private final ProductRepository productRepository;
    private final CityRepository cityRepository;
    private final CategoryRepository categoryRepository;
    private final FavouriteRepository favouriteRepository;
    private final ProductPoliciesRepository productPoliciesRepository;
    private final ObjectMapper mapper;
    private final ImageService imageService;

    @Autowired
    public ProductService(ProductRepository productRepository,
                          CityRepository cityRepository,
                          CategoryRepository categoryRepository,
                          ProductPoliciesRepository productPoliciesRepository,
                          ObjectMapper mapper,
                          ImageService imageService,
                          FavouriteRepository favouriteRepository) {
        this.productRepository = productRepository;
        this.cityRepository = cityRepository;
        this.categoryRepository = categoryRepository;
        this.productPoliciesRepository = productPoliciesRepository;
        this.mapper = mapper;
        this.imageService = imageService;
        this.favouriteRepository = favouriteRepository;
    }

    public void addProduct(AddProductDTO product, List<MultipartFile> multipartFile) throws BadRequestException, IOException {
        if (product == null)
            throw new BadRequestException("Didn't get a product to save");
        Product p = productRepository.save(mapper.convertValue(product, Product.class));
        List<ProductPoliciesDTO> productPoliciesDTOS = product.getPolicies();
        for (ProductPoliciesDTO prodPol : productPoliciesDTOS) {
            prodPol.setProduct(p);
            productPoliciesRepository.save(mapper.convertValue(prodPol, ProductPolicies.class));
        }
        for (MultipartFile mpf : multipartFile) {
            imageService.upLoadImage(mpf, p.getId());
        }
    }

    public ProductDTO findProductById(Long id) throws BadRequestException, ResourceNotFoundException {
        if (id == null)
            throw new BadRequestException("Id can't be null");
        Optional<Product> product = productRepository.findById(id);
        if (product.isEmpty())
            throw new ResourceNotFoundException("Can't find product with id: " + id);
        return prodBuilder(product.get());
    }

    public ProductDTO findProductByTitle(String title) throws BadRequestException, ResourceNotFoundException {
        if (title == null)
            throw new BadRequestException("Title can't be null");
        List<Product> product = productRepository.findByProductTitle(title);
        if (product.isEmpty())
            throw new ResourceNotFoundException("Can't find product titled: " + title);
        return mapper.convertValue(product.get(0), ProductDTO.class);
    }

    public List<ProductDTO> productList() {
        List<Product> products = productRepository.findAll();
        List<ProductDTO> productsDTOS = new ArrayList<>();
        for (Product c :
                products) {
            ProductDTO cdto = mapper.convertValue(c, ProductDTO.class);
            productsDTOS.add(cdto);
        }
        return productsDTOS;
    }

    public String editProduct(ProductDTO product) throws ResourceNotFoundException {
        List<Product> cat = productRepository.findByProductTitle(product.getTitle());
        if (cat.isEmpty())
            throw new ResourceNotFoundException("Can't find any product named: " + product.getTitle());
        if (cat.size() > 1)
            throw new ResourceNotFoundException("There are too many products with that name");
        productRepository.save(cat.get(0));
        return "Product: " + product.getTitle() + " has been updated.";
    }

    public String deleteProduct(Long id) throws BadRequestException, ResourceNotFoundException {
        if (id == null)
            throw new BadRequestException("Id can't be null");
        if (productRepository.findById(id).isEmpty())
            throw new ResourceNotFoundException("Can't find product with id: " + id);
        productRepository.deleteById(id);
        return "Product with id: " + id + " has been updated.";
    }

    public ReservationProductDTO reservationProduct(Long id) throws BadRequestException, ResourceNotFoundException {
        if (id == null)
            throw new BadRequestException("Id can't be null");
        Optional<Product> product = productRepository.findById(id);
        if (product.isEmpty())
            throw new ResourceNotFoundException("Can't find product with id: " + id);
        return mapper.convertValue(product, ReservationProductDTO.class);
    }

    public List<HomeProductDTO> favouriteProducts(Long id) {
        List<Product> products = favouriteRepository.findProductByUserId(id);
        Collections.shuffle(products);
        return homeProdBuilder(products, 0L);
    }

    public List<HomeProductDTO> homeProducts(String category, String city, Date startDate, Date endDate, Long userId) throws BadRequestException {
        boolean nullCat = Objects.equals(category, "null");
        boolean nullCity = Objects.equals(city, "null");
        boolean nullSDate = new SimpleDateFormat("yyyy-MM-dd").format(startDate).equals("1899-12-31");
        boolean nullEDate = new SimpleDateFormat("yyyy-MM-dd").format(endDate).equals("1899-12-31");
        List<Category> categories = new ArrayList<>();
        List<City> cities = new ArrayList<>();

        if (!nullCat) {
            categories = categoryRepository.findByCategoryTitle(category);
            if (categories.size() == 0)
                throw new BadRequestException("Can't find category: " + category);
        }
        if (!nullCity) {
            cities = cityRepository.findByCityName(city);
            if (cities.size() == 0)
                throw new BadRequestException("Can't find city: " + city);
        }

        if (!nullCat && nullCity && nullSDate && nullEDate)
            return homeProdBuilder(productRepository.findByCategory(categories.get(0)), userId);
        if (nullCat && !nullCity && nullSDate && nullEDate)
            return homeProdBuilder(productRepository.findByCity(cities.get(0)), userId);
        if (!nullCat && !nullCity && nullSDate && nullEDate)
            return homeProdBuilder(productRepository.findByCategory(categories.get(0)).stream().filter(product -> product.getCity().getName().equals(city)).collect(Collectors.toList()), userId);
        if (nullCat && nullCity && !nullSDate && !nullEDate)
            return homeProdBuilder(productRepository.findByDate(startDate, endDate), userId);
        if (nullCat && !nullCity && !nullSDate && !nullEDate)
            return homeProdBuilder(productRepository.findByReservationDateAndCity(startDate, endDate, city), userId);
        if (!nullCat && nullCity && !nullSDate && !nullEDate)
            return homeProdBuilder(productRepository.findByDate(startDate, endDate).stream().filter(product -> product.getCategory().getTitle().equals(category)).collect(Collectors.toList()), userId);
        if (!nullCat && !nullCity && !nullSDate && !nullEDate)
            return homeProdBuilder(productRepository.findByReservationDateAndCity(startDate, endDate, city).stream().filter(product -> product.getCategory().getTitle().equals(category)).collect(Collectors.toList()), userId);
        List<Product> products = productRepository.findAll();
        Collections.shuffle(products);
        products = products.subList(0, 8);
        return homeProdBuilder(products, userId);
    }

    private List<HomeProductDTO> homeProdBuilder(List<Product> products, Long id) {
        List<HomeProductDTO> parsedProducts = new ArrayList<>();
        List<Product> favourites = favouriteRepository.findProductByUserId(id);

        for (Product p :
                products) {
            HomeProductDTO homeProductDTO = new HomeProductDTO();
            boolean favourite = false;
            for (Product f :
                    favourites) {
                if (p.getId().intValue() == f.getId().intValue()) {
                    favourite = true;
                    break;
                }
            }
            if (p.getScores().isEmpty()) {
                List<Long> s = new ArrayList<>();
                s.add(Long.parseLong("0"));
                homeProductDTO.setScores(s.stream().map(Score::new).collect(Collectors.toSet()));
            } else {
                homeProductDTO.setScores(p.getScores());
            }
            homeProductDTO.setId(p.getId());
            homeProductDTO.setTitle(p.getTitle());
            homeProductDTO.setDescription(p.getDescription());
            homeProductDTO.setLatitude(p.getLatitude());
            homeProductDTO.setLongitude(p.getLongitude());
            homeProductDTO.setCategory(mapper.convertValue(p.getCategory(), CategoryDTO.class));
            homeProductDTO.setCity(mapper.convertValue(p.getCity(), CityDTO.class));
            homeProductDTO.setImages(p.getImages());
            homeProductDTO.setCharacteristics(p.getCharacteristics());
            homeProductDTO.setFavourite(favourite);
            parsedProducts.add(homeProductDTO);
        }
        return parsedProducts;
    }

    private ProductDTO prodBuilder(Product p) {
        ProductDTO productDTO = new ProductDTO();
        if (p.getScores().isEmpty()) {
            List<Long> s = new ArrayList<>();
            s.add(Long.parseLong("0"));
            productDTO.setScores(s.stream().map(Score::new).collect(Collectors.toSet()));
        } else {
            productDTO.setScores(p.getScores());
        }
        productDTO.setId(p.getId());
        productDTO.setTitle(p.getTitle());
        productDTO.setDescription(p.getDescription());
        productDTO.setLatitude(p.getLatitude());
        productDTO.setLongitude(p.getLongitude());
        productDTO.setCategory(mapper.convertValue(p.getCategory(), CategoryDTO.class));
        productDTO.setCity(mapper.convertValue(p.getCity(), CityDTO.class));
        productDTO.setImages(p.getImages());
        productDTO.setCharacteristics(p.getCharacteristics());
        productDTO.setReservations(p.getReservations());
        productDTO.setPolicies(p.getPolicies());
        productDTO.setCheckOut(p.getCheckOut());
        productDTO.setCancellation(p.getCancellation());
        return productDTO;
    }

}



