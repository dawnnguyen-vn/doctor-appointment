package com.example.doctorappointment.service.impl;

import com.example.doctorappointment.DTO.doctor.DoctorReadDTO;
import com.example.doctorappointment.DTO.doctor.DoctorWriteDTO;
import com.example.doctorappointment.DTO.user.UserDTO;
import com.example.doctorappointment.entity.ClinicEntity;
import com.example.doctorappointment.entity.DoctorEntity;
import com.example.doctorappointment.entity.SpecialtyEntity;
import com.example.doctorappointment.repository.DoctorRepo;
import com.example.doctorappointment.service.ClinicService;
import com.example.doctorappointment.service.DoctorService;
import com.example.doctorappointment.service.SpecialtyService;
import com.example.doctorappointment.utility.DataMapperUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DoctorServiceImpl implements DoctorService {

    private final DoctorRepo doctorRepo;
    private final DataMapperUtils dataMapperUtils;
    private final ClinicService clinicService;
    private final SpecialtyService specialtyService;

    @Override
    public DoctorReadDTO save(DoctorWriteDTO newDoctor) {
        ClinicEntity clinic = clinicService.findById(newDoctor.getClinicId());
        SpecialtyEntity specialty = specialtyService.getById(newDoctor.getSpecialtyId());
        DoctorEntity doctor = dataMapperUtils.map(newDoctor, DoctorEntity.class);
        doctor.setClinic(clinic);
        doctor.setSpecialty(specialty);
        DoctorEntity doctorResult = doctorRepo.save(doctor);
        clinic.addDoctor(doctorResult);
        specialty.addDoctor(doctorResult);
        return convertEntityToDTO(doctorResult);
    }

    @Override
    public List<DoctorReadDTO> findAll() {
        List<DoctorReadDTO> doctorReadDTOS = dataMapperUtils.mapAll(doctorRepo.findAll(), DoctorReadDTO.class);
        return doctorReadDTOS;
    }

    private DoctorReadDTO convertEntityToDTO(DoctorEntity doctorResult) {
        DoctorReadDTO doctorReadDTO = dataMapperUtils.map(doctorResult, DoctorReadDTO.class);
        doctorReadDTO.setClinicId(doctorResult.getClinic().getId());
        doctorReadDTO.setSpecialtyId(doctorResult.getSpecialty().getId());
        doctorReadDTO.setUser(dataMapperUtils.map(doctorResult.getUser(), UserDTO.class));
        return doctorReadDTO;
    }
}
