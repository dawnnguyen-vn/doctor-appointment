package com.example.doctorappointment.service;

import com.example.doctorappointment.DTO.doctor.DoctorReadDTO;
import com.example.doctorappointment.DTO.doctor.DoctorWriteDTO;
import com.example.doctorappointment.entity.DoctorEntity;

import java.util.List;

public interface DoctorService {
    DoctorReadDTO save(DoctorWriteDTO newDoctor);
    List<DoctorReadDTO> findAll();
    DoctorReadDTO getDoctorById(int doctorId);
    DoctorReadDTO update(int doctorId, DoctorWriteDTO newDoctor);
    DoctorReadDTO getDoctorByEmail(String email);
    DoctorEntity findById(int id);
    boolean delete(int doctorId);
    List<DoctorReadDTO> findTop5();
    List<DoctorReadDTO> findByName(String name);
}
