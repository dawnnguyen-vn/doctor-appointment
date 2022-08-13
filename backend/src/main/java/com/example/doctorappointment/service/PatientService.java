package com.example.doctorappointment.service;

import com.example.doctorappointment.entity.PatientEntity;

public interface PatientService {
    PatientEntity save(PatientEntity patient);
    PatientEntity findByPhone(String phone);
}
