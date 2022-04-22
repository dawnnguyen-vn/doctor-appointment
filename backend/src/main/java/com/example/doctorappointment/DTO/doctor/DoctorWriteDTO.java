package com.example.doctorappointment.DTO.doctor;

import com.example.doctorappointment.entity.UserEntity;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class DoctorWriteDTO {
    private int id;
    private String image;
    private String firstName;
    private String lastName;
    private String phone;
    private boolean gender;
    private int clinicId;
    private int specialtyId;
    private UserEntity user;
}
