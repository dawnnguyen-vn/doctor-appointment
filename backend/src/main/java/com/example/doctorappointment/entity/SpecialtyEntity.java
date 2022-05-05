package com.example.doctorappointment.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

import static javax.persistence.FetchType.LAZY;


@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "specialties")
public class SpecialtyEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    @NotBlank(message = "Tên không được bỏ trống")
    private String name;

    @Column
    private String description;

    @Column(nullable = false)
    @NotBlank(message = "image không được bỏ trống")
    private String image;

    @JsonIgnore
    @OneToMany(
            mappedBy = "specialty",
            cascade = CascadeType.ALL,
            fetch = FetchType.EAGER
    )

    private List<DoctorEntity> doctors ;

    @OneToOne(fetch = LAZY)
    private MarkdownEntity markdown;
    public void addDoctor(DoctorEntity doctor) {
        doctors.add(doctor);
        doctor.setSpecialty(this);
    }

    public void removeDoctor(DoctorEntity doctor) {
        doctors.remove(doctor);
        doctor.setSpecialty(null);
    }



}
