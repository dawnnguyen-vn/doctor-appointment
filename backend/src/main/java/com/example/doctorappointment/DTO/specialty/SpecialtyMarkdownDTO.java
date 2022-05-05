package com.example.doctorappointment.DTO.specialty;

import com.example.doctorappointment.DTO.MarkdownDTO;
import com.example.doctorappointment.DTO.doctor.DoctorDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SpecialtyMarkdownDTO {
    private int id;
    private String description;
    private String image;
    private String name;
    private MarkdownDTO markdown;
    private List<DoctorDTO> doctors;
}
