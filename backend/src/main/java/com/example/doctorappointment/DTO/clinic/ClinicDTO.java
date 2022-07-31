package com.example.doctorappointment.DTO.clinic;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ClinicDTO {
    private int id;
    private String name;
    private String image;
    private String address;
}
