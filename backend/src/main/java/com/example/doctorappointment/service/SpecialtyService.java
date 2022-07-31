package com.example.doctorappointment.service;

import com.example.doctorappointment.DTO.specialty.SpecialtyDTO;
import com.example.doctorappointment.DTO.specialty.SpecialtyReadDTO;
import com.example.doctorappointment.entity.SpecialtyEntity;

import java.util.List;

public interface SpecialtyService {
    List<SpecialtyReadDTO> getAll();
    List<SpecialtyReadDTO> getAllByClinicId(int id);
    SpecialtyReadDTO getById(int Id);
    SpecialtyEntity geEntitytById(int id);
    SpecialtyDTO createSpecialty(SpecialtyDTO specialtyDTO);
    SpecialtyDTO updateSpecialty(int id, SpecialtyEntity specialty);
    boolean deleteSpecialty(int id);
    boolean existsByName(String name);
    SpecialtyReadDTO search(List<String> systom);
    List<SpecialtyReadDTO> search(String systom);
    SpecialtyReadDTO convertEntityToDTO(SpecialtyEntity specialty);
    List<SpecialtyReadDTO> findTop5();
}
