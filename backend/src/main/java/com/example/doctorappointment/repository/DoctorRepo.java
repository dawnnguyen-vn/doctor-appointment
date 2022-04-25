package com.example.doctorappointment.repository;

import com.example.doctorappointment.entity.DoctorEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DoctorRepo extends JpaRepository<DoctorEntity, Integer> {
    DoctorEntity findById(int id);

}
