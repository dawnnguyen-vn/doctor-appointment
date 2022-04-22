package com.example.doctorappointment.DTO.doctor;

import com.example.doctorappointment.DTO.user.UserDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DoctorReadDTO {
    private int id;
    private String firstName;
    private String lastName;
    private String phone;
    private boolean gender;
    private int clinicId;
    private int specialtyId;
    private UserDTO user;

}
