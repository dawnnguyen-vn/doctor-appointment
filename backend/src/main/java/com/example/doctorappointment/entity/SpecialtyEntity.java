package com.example.doctorappointment.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "_Specialty")
public class SpecialtyEntity extends BaseEntity{

    @Column(name = "_description")
    String description;
    @Column(name = "_image",nullable = false)
    @NotBlank(message = "image không được bỏ trống")
    String image;
    @Column(name = "_name", length = 20,nullable = false)
    @NotBlank(message = "name không được bỏ trống")
    String name;

}
