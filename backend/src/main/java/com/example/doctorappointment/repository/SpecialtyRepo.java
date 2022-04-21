package com.example.doctorappointment.repository;

import com.example.doctorappointment.entity.SpecialtyEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SpecialtyRepo extends JpaRepository<SpecialtyEntity, Integer> {
}
