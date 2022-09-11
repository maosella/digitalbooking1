package com.digitalbooking.demo.repository;

import com.digitalbooking.demo.model.Favourite;
import com.digitalbooking.demo.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface FavouriteRepository extends JpaRepository<Favourite, Long> {
    @Query("SELECT f.product FROM Favourite f WHERE f.user.id = ?1")
    List<Product> findProductByUserId(Long id);

    @Transactional
    @Modifying
    @Query("DELETE FROM Favourite f WHERE f.product.id = ?1 AND f.user.id = ?2")
    void deleteByProductIdAndUserId(Long productId, Long userId);
}
