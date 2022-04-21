package com.example.doctorappointment.service.impl;

import com.example.doctorappointment.entity.SpecialtyEntity;
import com.example.doctorappointment.repository.SpecialtyRepo;
import com.example.doctorappointment.service.SpecialtyService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SpecialtyServiceImpl implements SpecialtyService {

    private final SpecialtyRepo specialtyRepo;

    @Override
    public SpecialtyEntity findById(int id) {
        return specialtyRepo.findById(id).get();
    }

    @Override
    public List<SpecialtyEntity> findAll() {
        return specialtyRepo.findAll();
    }

    @Override
    public SpecialtyEntity save(SpecialtyEntity specialty) {
        return specialtyRepo.save(specialty);
    }
}
