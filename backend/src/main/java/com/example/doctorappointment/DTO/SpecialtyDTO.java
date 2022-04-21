package com.example.doctorappointment.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.validation.constraints.NotBlank;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SpecialtyDTO {
    private int id;
    private String description;
    private String image;
    private String name;

}
