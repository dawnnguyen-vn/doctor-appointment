package com.example.doctorappointment.DTO.specialty;

import com.example.doctorappointment.DTO.doctor.DoctorReadDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.validation.constraints.NotBlank;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SpecialtyDTO {
    private int id;
    private String description;
    private String image;
    private String name;
    private int clinicId;
}
