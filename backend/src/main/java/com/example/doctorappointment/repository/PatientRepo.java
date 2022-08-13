package com.example.doctorappointment.repository;

import com.example.doctorappointment.entity.PatientEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PatientRepo extends JpaRepository<PatientEntity, Integer> {
    PatientEntity findFirstByPhone(String phone);
}
