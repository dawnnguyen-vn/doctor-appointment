package com.example.doctorappointment.DTO.doctor;

import com.example.doctorappointment.DTO.ClinicDTO;
import com.example.doctorappointment.DTO.SpecialtyDTO;
import com.example.doctorappointment.DTO.user.UserDTO;
import com.example.doctorappointment.entity.ClinicEntity;
import com.example.doctorappointment.entity.MarkdownEntity;
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
}
