package com.example.doctorappointment.repository;

import com.example.doctorappointment.entity.SpecialtyEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface SpecialtyRepo extends JpaRepository<SpecialtyEntity,Integer> {
    SpecialtyEntity findByName(String name);
    SpecialtyEntity findById(int id);
    boolean existsByName(String name);
    SpecialtyEntity findSpecialtyEntitiesBySymptomsIn(List<String> SysmtomsIn);
    List<SpecialtyEntity> findDistinctBySymptomsLike(@Param("systom") String systom);
    List<SpecialtyEntity> findTop5ByOrderByIdDesc();
    List<SpecialtyEntity> findAllByClinicId(int id);
}