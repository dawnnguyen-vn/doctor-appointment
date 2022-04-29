package com.example.doctorappointment.service.impl;

import com.example.doctorappointment.entity.PatientEntity;
import com.example.doctorappointment.repository.PatientRepo;
import com.example.doctorappointment.service.PatientService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Transactional
@Service
@RequiredArgsConstructor
public class PatientServiceImpl implements PatientService {

    private final PatientRepo patientRepo;

    @Override
    public PatientEntity save(PatientEntity patient) {
        return patientRepo.save(patient);
    }
}
