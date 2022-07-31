package com.example.doctorappointment.service.impl;

import com.example.doctorappointment.DTO.MarkdownDTO;
import com.example.doctorappointment.DTO.doctor.DoctorDTO;
import com.example.doctorappointment.DTO.specialty.SpecialtyDTO;
import com.example.doctorappointment.DTO.specialty.SpecialtyReadDTO;
import com.example.doctorappointment.entity.ClinicEntity;
import com.example.doctorappointment.entity.MarkdownEntity;
import com.example.doctorappointment.entity.SpecialtyEntity;
import com.example.doctorappointment.repository.ClinicRepo;
import com.example.doctorappointment.repository.MarkdownRepo;
import com.example.doctorappointment.repository.SpecialtyRepo;
import com.example.doctorappointment.service.ClinicService;
import com.example.doctorappointment.service.SpecialtyService;
import com.example.doctorappointment.utility.DataMapperUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
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
    private final MarkdownRepo markdownRepo;
    private final ClinicService clinicService;
    private final ClinicRepo clinicRepo;

    @Override
    public List<SpecialtyReadDTO> getAll() {
        List<SpecialtyEntity> data = repo.findAll();
        List<SpecialtyReadDTO> dataResult = data.stream()
                .map(specialty -> convertEntityToDTO(specialty))
                .collect(Collectors.toList());
        return dataResult;
    }

    @Override
    public List<SpecialtyReadDTO> getAllByClinicId(int id) {
        List<SpecialtyEntity> data = repo.findAllByClinicId(id);
        List<SpecialtyReadDTO> dataResult = data.stream()
                .map(specialty -> convertEntityToDTO(specialty))
                .collect(Collectors.toList());
        return dataResult;
    }
    @Override
    public SpecialtyReadDTO getById(int id) {
        SpecialtyEntity data = repo.findById(id);
        if (data != null)
            return convertEntityToDTO(data);
        return null;
    }

    @Override
    public SpecialtyEntity geEntitytById(int id) {
        SpecialtyEntity data = repo.findById(id);
        if (data != null)
            return (data);
        return null;
    }

    @Override
    public SpecialtyDTO createSpecialty(SpecialtyDTO specialtyDTO) {
        MarkdownEntity markdown = markdownRepo.save(new MarkdownEntity(0, "", "", "", 0, specialtyDTO.getId(), 0));
        ClinicEntity clinic = clinicRepo.findDistinctById(specialtyDTO.getClinicId());
        SpecialtyEntity specialty = dataMapperUtils.map(specialtyDTO,SpecialtyEntity.class);
        specialty.setMarkdown(markdown);
        specialty.setClinic(clinic);
        SpecialtyEntity dataResult = repo.save(specialty);
        clinic.addSpecialty(dataResult);
        clinicService.updateClinic(specialtyDTO.getId(), clinic);
        return dataMapperUtils.map(dataResult, SpecialtyDTO.class);
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
            repo.deleteById(id);
            return true;
        }
        return false;
    }

    @Override
    public boolean existsByName(String name) {
        return repo.existsByName(name);
    }

    @Override
    public SpecialtyReadDTO search(List<String> systom) {
        if (!systom.isEmpty()) {
            return convertEntityToDTO(repo.findSpecialtyEntitiesBySymptomsIn(systom));
        }
        return null;
    }

    @Override
    public List<SpecialtyReadDTO> search(String systom) {
        if (systom!=null&&systom!="'\'") {
            try {
                List<SpecialtyReadDTO> result = repo.findDistinctBySymptomsLike(systom).stream()
                        .map(specialty -> convertEntityToDTO(specialty))
                        .collect(Collectors.toList());
                return result;
            }catch (Exception e){
                System.out.println("systom : "+systom);
                System.out.println(e);
            }
        }
        return null;
    }

    @Override
    public List<SpecialtyReadDTO> findTop5() {
        List<SpecialtyReadDTO> result =  repo.findTop5ByOrderByIdDesc().stream()
                .map(specialty -> convertEntityToDTO(specialty))
                .collect(Collectors.toList());
        return result;
    }

    public SpecialtyReadDTO convertEntityToDTO(SpecialtyEntity specialty) {
        SpecialtyReadDTO specialtyReadDTO = dataMapperUtils.map(specialty, SpecialtyReadDTO.class);
        List<DoctorDTO> listDoctor = specialty.getDoctors().stream()
                .map(doctorEntity -> dataMapperUtils.map(doctorEntity, DoctorDTO.class))
                .collect(Collectors.toList());
        specialtyReadDTO.setClinicId(specialty.getClinic().getId());
        specialtyReadDTO.setDoctors(listDoctor);
        return specialtyReadDTO;
    }

}

