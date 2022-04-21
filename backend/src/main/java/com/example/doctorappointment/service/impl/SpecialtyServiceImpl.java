package com.example.doctorappointment.service.impl;

import com.example.doctorappointment.DTO.SpecialtyDTO;
import com.example.doctorappointment.entity.SpecialtyEntity;
import com.example.doctorappointment.repository.SpecialtyRepo;
import com.example.doctorappointment.service.SpecialtyService;
import com.example.doctorappointment.utility.DataMapperUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class SpecialtyServiceImpl implements SpecialtyService {
    private final SpecialtyRepo repo;
    private final DataMapperUtils dataMapperUtils;

    @Override
    public List<SpecialtyDTO> getAll() {
        List<SpecialtyEntity> data = repo.findAll();
        if(data.size()!=0)
        return dataMapperUtils.mapAll(repo.findAll(),SpecialtyDTO.class);
        return null;
    }

    @Override
    public SpecialtyDTO getById(int id) {
        SpecialtyEntity data = repo.findById(id);
        if(data!=null)
        return dataMapperUtils.map(repo.findById(id),SpecialtyDTO.class);
        return null;
    }

    @Override
    public SpecialtyDTO createSpecialty(SpecialtyEntity specialty) {
        return dataMapperUtils.map(repo.save(specialty),SpecialtyDTO.class);
    }

    @Override
    public SpecialtyDTO updateSpecialty(int id, SpecialtyEntity specialty) {
        SpecialtyEntity specialtyUpdate = repo.findById(id);
        if(specialtyUpdate!=null){
            specialtyUpdate.setName(specialty.getName());
            specialtyUpdate.setDescription(specialty.getDescription());
            specialtyUpdate.setImage(specialty.getImage());
            return dataMapperUtils.map(repo.save(specialtyUpdate),SpecialtyDTO.class);
        }
        return null;
    }


    @Override
    public boolean deleteSpecialty(int id) {
        SpecialtyEntity specialty = repo.findById(id);
        if(specialty!=null){
            repo.delete(specialty);
            return true;
        }
        return false;
    }

    @Override
    public boolean existsByName(String name) {
        return repo.existsByName(name);
    }

}
