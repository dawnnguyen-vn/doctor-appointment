package com.example.doctorappointment.service;

import com.example.doctorappointment.entity.SpecialtyEntity;

import java.util.List;

public interface SpecialtyService {
    SpecialtyEntity findById(int id);
    List<SpecialtyEntity> findAll();
    SpecialtyEntity save(SpecialtyEntity specialty);
}
