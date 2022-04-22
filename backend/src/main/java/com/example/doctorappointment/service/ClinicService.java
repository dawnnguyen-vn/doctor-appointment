package com.example.doctorappointment.service;

import com.example.doctorappointment.entity.ClinicEntity;

import java.util.List;

public interface ClinicService {

    ClinicEntity save(ClinicEntity clinic);
    ClinicEntity findById(int id);
    List<ClinicEntity> findAll();
}
