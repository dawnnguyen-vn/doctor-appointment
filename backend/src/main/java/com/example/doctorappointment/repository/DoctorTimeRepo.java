package com.example.doctorappointment.repository;

import com.example.doctorappointment.entity.DoctorEntity;
import com.example.doctorappointment.entity.DoctorTimeEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DoctorTimeRepo extends JpaRepository<DoctorTimeEntity, Integer> {
}
