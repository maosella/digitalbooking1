package com.digitalbooking.demo.security.repository;

import com.digitalbooking.demo.security.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);

    @Transactional
    @Modifying(clearAutomatically = true)
    @Query("UPDATE User u SET u.city = :city WHERE u.id = :id")
    void updateCity(@Param("city") String city, @Param("id") Long id);

    @Transactional
    @Modifying(clearAutomatically = true)
    @Query("UPDATE User u SET u.enabled = :enabled WHERE u.id = :id")
    void updateEnabled(@Param("enabled") boolean enabled, @Param("id") Long id);
}
