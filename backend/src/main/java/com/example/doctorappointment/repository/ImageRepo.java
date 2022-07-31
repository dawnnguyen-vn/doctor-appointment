package com.example.doctorappointment.repository;


import java.util.Optional;

import com.example.doctorappointment.entity.ImageEntity;
import org.springframework.data.jpa.repository.JpaRepository;


public interface ImageRepo extends JpaRepository<ImageEntity, Long> {
    ImageEntity findByName(String name);
    ImageEntity findTop1ByName(String name);

}
