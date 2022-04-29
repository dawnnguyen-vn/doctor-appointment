package com.example.doctorappointment.service;

import com.example.doctorappointment.DTO.doctor.DoctorReadDTO;
import com.example.doctorappointment.DTO.doctor.DoctorWriteDTO;

import java.util.List;

public interface DoctorService {
    DoctorReadDTO save(DoctorWriteDTO newDoctor);
    List<DoctorReadDTO> findAll();
    DoctorReadDTO getDoctorById(int doctorId);
    DoctorReadDTO update(int doctorId, DoctorWriteDTO newDoctor);
    boolean delete(int doctorId);
}
