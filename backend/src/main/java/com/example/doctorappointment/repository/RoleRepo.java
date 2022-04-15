package com.example.doctorappointment.repository;

import com.example.doctorappointment.entity.RoleEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepo extends JpaRepository<RoleEntity,Integer> {
    RoleEntity findByName(String name);
}
