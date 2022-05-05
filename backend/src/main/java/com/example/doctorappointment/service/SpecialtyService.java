package com.example.doctorappointment.service;

import com.example.doctorappointment.DTO.specialty.SpecialtyDTO;
import com.example.doctorappointment.DTO.specialty.SpecialtyReadDTO;
import com.example.doctorappointment.entity.SpecialtyEntity;

import java.util.List;

public interface SpecialtyService {
    List<SpecialtyReadDTO> getAll();
    SpecialtyReadDTO getById(int Id);
    SpecialtyEntity geEntitytById(int id);
    SpecialtyDTO createSpecialty(SpecialtyEntity specialty);
    SpecialtyDTO updateSpecialty(int id, SpecialtyEntity specialty);
    boolean deleteSpecialty(int id);
    boolean existsByName(String name);

}
