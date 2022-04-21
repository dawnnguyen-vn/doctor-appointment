package com.example.doctorappointment.repository;
import com.example.doctorappointment.entity.RoleEntity;
import com.example.doctorappointment.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Set;

public interface UserRepo extends JpaRepository<UserEntity,Integer> {
    UserEntity findByEmail(String email);
    boolean existsByEmail(String email);
}
