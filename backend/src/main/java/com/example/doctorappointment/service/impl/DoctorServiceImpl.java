package com.example.doctorappointment.service.impl;

import com.example.doctorappointment.DTO.ClinicDTO;
import com.example.doctorappointment.DTO.SpecialtyDTO;
import com.example.doctorappointment.DTO.doctor.DoctorReadDTO;
import com.example.doctorappointment.DTO.doctor.DoctorWriteDTO;
import com.example.doctorappointment.DTO.user.UserDTO;
import com.example.doctorappointment.entity.*;
import com.example.doctorappointment.repository.DoctorRepo;
import com.example.doctorappointment.repository.MarkdownRepo;
import com.example.doctorappointment.repository.PositionRepo;
import com.example.doctorappointment.repository.UserRepo;
import com.example.doctorappointment.service.ClinicService;
import com.example.doctorappointment.service.DoctorService;
import com.example.doctorappointment.service.SpecialtyService;
import com.example.doctorappointment.utility.DataMapperUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DoctorServiceImpl implements DoctorService {

    private final DoctorRepo doctorRepo;
    private final DataMapperUtils dataMapperUtils;
    private final ClinicService clinicService;
    private final SpecialtyService specialtyService;
    private final PositionRepo positionRepo;

    private final UserRepo userRepo;


    @Override
    public DoctorReadDTO save(DoctorWriteDTO newDoctor) {
        ClinicEntity clinic = clinicService.findById(newDoctor.getClinicId());
        SpecialtyEntity specialty = specialtyService.getById(newDoctor.getSpecialtyId());
        DoctorEntity doctor = dataMapperUtils.map(newDoctor, DoctorEntity.class);
        PositionEntity position = positionRepo.findById(newDoctor.getPositionId());
        doctor.setPosition(position);
        doctor.setClinic(clinic);
        doctor.setSpecialty(specialty);
        DoctorEntity doctorResult = doctorRepo.save(doctor);
        clinic.addDoctor(doctorResult);
        specialty.addDoctor(doctorResult);
        return convertEntityToDTO(doctorResult);
    }

    @Override
    public List<DoctorReadDTO> findAll() {
        List<DoctorEntity> doctorEntity = doctorRepo.findAll();
        List<DoctorReadDTO> doctorReadDTOS = doctorEntity.stream()
                .map(doctor -> convertEntityToDTO(doctor))
                .collect(Collectors.toList());
        return doctorReadDTOS;
    }

    @Override
    public DoctorReadDTO getDoctorById(int doctorId) {
        DoctorEntity doctorEntity = doctorRepo.findById(doctorId);
        DoctorReadDTO doctorReadDTO = convertEntityToDTO(doctorEntity);
        return doctorReadDTO;
    }

    @Override
    public DoctorReadDTO update(int doctorId, DoctorWriteDTO newDoctor) {
        DoctorEntity updateDoctor = doctorRepo.findById(doctorId);
        ClinicEntity clinic = clinicService.findById(newDoctor.getClinicId());
        SpecialtyEntity specialty = specialtyService.getById(newDoctor.getSpecialtyId());
        PositionEntity position = positionRepo.findById(newDoctor.getPositionId());
        updateDoctor.setPosition(position);
        updateDoctor.setClinic(clinic);
        updateDoctor.setSpecialty(specialty);
        DoctorEntity doctorResult = doctorRepo.save(updateDoctor);
        clinic.addDoctor(doctorResult);
        specialty.addDoctor(doctorResult);
        return convertEntityToDTO(doctorResult);
    }

    @Override
    public boolean delete(int doctorId) {
        DoctorEntity doctor = doctorRepo.findById(doctorId);
        if(doctor!=null){
            doctorRepo.deleteById(doctorId);
            userRepo.delete(doctor.getUser());
            return true;
        }
        return false;
    }


    private DoctorReadDTO convertEntityToDTO(DoctorEntity doctorResult) {
        DoctorReadDTO doctorReadDTO = dataMapperUtils.map(doctorResult, DoctorReadDTO.class);
        doctorReadDTO.setClinic(dataMapperUtils.map(doctorResult.getClinic(), ClinicDTO.class));
        doctorReadDTO.setSpecialty(dataMapperUtils.map(doctorResult.getSpecialty(), SpecialtyDTO.class));
        doctorReadDTO.setUser(dataMapperUtils.map(doctorResult.getUser(), UserDTO.class));
        doctorReadDTO.setPositon(doctorResult.getPosition().getName());
        return doctorReadDTO;
    }
}
