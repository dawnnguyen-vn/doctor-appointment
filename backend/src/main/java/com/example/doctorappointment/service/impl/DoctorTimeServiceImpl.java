package com.example.doctorappointment.service.impl;

import com.example.doctorappointment.entity.DoctorTimeEntity;
import com.example.doctorappointment.repository.DoctorTimeRepo;
import com.example.doctorappointment.service.DoctorTimeService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DoctorTimeServiceImpl implements DoctorTimeService {

    private final DoctorTimeRepo doctorTimeRepo;

    @Override
    public DoctorTimeEntity findById(int id) {
        return doctorTimeRepo.findById(id).get();
    }
}
