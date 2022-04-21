package com.example.doctorappointment.service.impl;

import com.example.doctorappointment.entity.ClinicEntity;
import com.example.doctorappointment.repository.ClinicRepo;
import com.example.doctorappointment.service.ClinicService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ClinicServiceImpl implements ClinicService {

    private final ClinicRepo clinicRepo;


    @Override
    public ClinicEntity save(ClinicEntity clinic) {
        return clinicRepo.save(clinic);
    }

    @Override
    public ClinicEntity findById(int id) {
        return clinicRepo.findById(id).get();
    }

    @Override
    public List<ClinicEntity> findAll() {
        return clinicRepo.findAll();
    }
}
