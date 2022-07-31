package com.example.doctorappointment.DTO.doctor;

import com.example.doctorappointment.DTO.clinic.ClinicDTO;
import com.example.doctorappointment.DTO.MarkdownDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DoctorDTO {
    private int id;
    private String image;
    private String firstName;
    private String lastName;
    private String phone;
    private boolean gender;
    private ClinicDTO clinic;
    private String positon;
    private MarkdownDTO markdown;
}
