package com.example.doctorappointment.service.impl;

import com.example.doctorappointment.DTO.doctor.DoctorDTO;
import com.example.doctorappointment.DTO.specialty.SpecialtyDTO;
import com.example.doctorappointment.DTO.specialty.SpecialtyReadDTO;
import com.example.doctorappointment.entity.SpecialtyEntity;
import com.example.doctorappointment.repository.SpecialtyRepo;
import com.example.doctorappointment.service.SpecialtyService;
import com.example.doctorappointment.utility.DataMapperUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class SpecialtyServiceImpl implements SpecialtyService {
    private final SpecialtyRepo repo;
    private final DataMapperUtils dataMapperUtils;

    @Override
    public List<SpecialtyReadDTO> getAll() {
        List<SpecialtyEntity> data = repo.findAll();
        List<SpecialtyReadDTO> dataResult = data.stream()
                .map(specialty -> convertEntityToDTO(specialty))
                .collect(Collectors.toList());
        return dataResult;
    }

    @Override
    public SpecialtyEntity getById(int id) {
        SpecialtyEntity data = repo.findById(id);
        if (data != null)
            return data;
        return null;
    }

    @Override
    public SpecialtyDTO createSpecialty(SpecialtyEntity specialty) {

        return dataMapperUtils.map(repo.save(specialty), SpecialtyDTO.class);
    }

    @Override
    public SpecialtyDTO updateSpecialty(int id, SpecialtyEntity specialty) {
        SpecialtyEntity specialtyUpdate = repo.findById(id);
        if (specialtyUpdate != null) {
            specialtyUpdate.setName(specialty.getName());
            specialtyUpdate.setDescription(specialty.getDescription());
            specialtyUpdate.setImage(specialty.getImage());
            return dataMapperUtils.map(repo.save(specialtyUpdate), SpecialtyDTO.class);
        }
        return null;
    }


    @Override
    public boolean deleteSpecialty(int id) {
        SpecialtyEntity specialty = repo.findById(id);
        if (specialty != null) {
            repo.delete(specialty);
            return true;
        }
        return false;
    }

    @Override
    public boolean existsByName(String name) {
        return repo.existsByName(name);
    }

    private SpecialtyReadDTO convertEntityToDTO(SpecialtyEntity specialty) {
        SpecialtyReadDTO specialtyReadDTO = dataMapperUtils.map(specialty, SpecialtyReadDTO.class);
        List<DoctorDTO> listDoctor = specialty.getDoctors().stream()
                .map(doctorEntity -> dataMapperUtils.map(doctorEntity, DoctorDTO.class))
                .collect(Collectors.toList());
        specialtyReadDTO.setDoctors(listDoctor);
        return specialtyReadDTO;
    }

}

