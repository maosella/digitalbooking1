package com.digitalbooking.demo.repository;

import com.digitalbooking.demo.model.Characteristic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CharacteristicRepository extends JpaRepository<Characteristic, Long> {
    @Query("SELECT c FROM Characteristic c WHERE c.name = ?1")
    Optional<List<Characteristic>> findByCharacteristicName(String name);
}
