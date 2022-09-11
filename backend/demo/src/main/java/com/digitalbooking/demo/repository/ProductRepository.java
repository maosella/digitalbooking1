package com.digitalbooking.demo.repository;

import com.digitalbooking.demo.model.Category;
import com.digitalbooking.demo.model.City;
import com.digitalbooking.demo.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    @Query("SELECT p FROM Product p WHERE p.title = ?1")
    List<Product> findByProductTitle(String title);

    @Query("SELECT p FROM Product p WHERE p.city = ?1")
    List<Product> findByCity(City city);

    @Query("SELECT p FROM Product p WHERE p.category = ?1")
    List<Product> findByCategory(Category category);

    long countByCategory(Category category);

    @Query("SELECT p FROM Product p  WHERE p.id NOT IN (SELECT p.id FROM Product p JOIN Reservation r ON r.product = p.id WHERE (r.start_date <= :start_date AND " +
            " r.end_date >= :start_date) OR (r.start_date <= :end_date AND r.end_date >= :end_date) OR" +
            " ( r.start_date >= :start_date AND r.start_date <= :end_date) OR (r.end_date >= :start_date AND r.end_date <= :end_date))")
    List<Product> findByDate(@Param("start_date") Date start_date, @Param("end_date") Date end_date);

    @Query("SELECT p FROM Product p  WHERE p.city.name = :city AND p.id NOT IN (SELECT p.id FROM Product p JOIN Reservation r ON r.product = p.id WHERE (r.start_date <= :start_date AND " +
            " r.end_date >= :start_date) OR (r.start_date <= :end_date AND r.end_date >= :end_date) OR ( r.start_date >= :start_date AND r.start_date <= :end_date)" +
            " OR (r.end_date >= :start_date AND r.end_date <= :end_date))")
    List<Product> findByReservationDateAndCity(@Param("start_date") Date start_date, @Param("end_date") Date end_date, @Param("city") String city);

}
