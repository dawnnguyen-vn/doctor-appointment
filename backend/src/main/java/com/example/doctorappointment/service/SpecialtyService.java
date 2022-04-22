package com.example.doctorappointment.service;

import com.example.doctorappointment.DTO.SpecialtyDTO;
import com.example.doctorappointment.entity.SpecialtyEntity;

import java.util.List;

public interface SpecialtyService {
    List<SpecialtyDTO> getAll();
    SpecialtyEntity getById(int Id);
    SpecialtyDTO createSpecialty(SpecialtyEntity specialty);
    SpecialtyDTO updateSpecialty(int id, SpecialtyEntity specialty);
    boolean deleteSpecialty(int id);
    boolean existsByName(String name);

}
