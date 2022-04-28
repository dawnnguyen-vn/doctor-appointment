package com.example.doctorappointment.repository;

import com.example.doctorappointment.entity.PositionEntity;
import com.example.doctorappointment.entity.RoleEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PositionRepo extends JpaRepository<PositionEntity,Integer> {
    PositionEntity findByName(String name);
    PositionEntity findById(int id);
}

