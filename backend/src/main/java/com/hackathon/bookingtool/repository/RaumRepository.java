package com.hackathon.bookingtool.repository;

import com.hackathon.bookingtool.model.Raum;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RaumRepository extends JpaRepository<Raum, Long> {
    Optional<Raum> findByNameIgnoreCase(String name);
}
