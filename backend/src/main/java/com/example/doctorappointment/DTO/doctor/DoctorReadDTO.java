package com.example.doctorappointment.DTO.doctor;

import com.example.doctorappointment.DTO.clinic.ClinicDTO;
import com.example.doctorappointment.DTO.MarkdownDTO;
import com.example.doctorappointment.DTO.specialty.SpecialtyDTO;
import com.example.doctorappointment.DTO.user.UserDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DoctorReadDTO {
    private int id;
    private String image;
    private String firstName;
    private String lastName;
    private String phone;
    private boolean gender;
    private ClinicDTO clinic;
    private SpecialtyDTO specialty;
    private String position;
    private UserDTO user;
    private MarkdownDTO markdown;
}
