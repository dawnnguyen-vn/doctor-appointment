package com.example.doctorappointment.repository;

import com.example.doctorappointment.entity.DoctorEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface DoctorRepo extends JpaRepository<DoctorEntity, Integer> {
    DoctorEntity findById(int id);

    DoctorEntity findByUser_Email(String email);

    List<DoctorEntity> findDoctorEntitiesByFirstNameLike(@Param("name") String name);

    List<DoctorEntity>  findTop5ByOrderByFirstNameAscIdDesc();

}
