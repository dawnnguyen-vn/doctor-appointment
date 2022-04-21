package com.example.doctorappointment.repository;

import com.example.doctorappointment.entity.ClinicEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClinicRepo extends JpaRepository<ClinicEntity, Integer> {
}
