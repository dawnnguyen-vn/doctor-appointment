package com.example.doctorappointment.DTO.clinic;

import com.example.doctorappointment.DTO.doctor.DoctorDTO;
import com.example.doctorappointment.DTO.specialty.SpecialtyReadDTO;
import com.example.doctorappointment.entity.ClinicMarkdownEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ClinicReadDTO {
    private int id;
    private String image;
    private String address;
    private String name;
    private ClinicMarkdownEntity markdown;
//    private List<SpecialtyReadDTO> specialties;
}
