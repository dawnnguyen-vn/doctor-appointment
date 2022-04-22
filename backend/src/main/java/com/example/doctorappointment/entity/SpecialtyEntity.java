package com.example.doctorappointment.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;

//@Data
//@NoArgsConstructor
//@AllArgsConstructor
//@Entity
//@Table(name = "_Specialty")
//public class SpecialtyEntity extends BaseEntity {
//
//    @Column(name = "_description")
//    String description;
//    @Column(name = "_image", nullable = false)
//    @NotBlank(message = "image không được bỏ trống")
//    String image;
//    @Column(name = "_name", length = 20, nullable = false)
//    @NotBlank(message = "name không được bỏ trống")
//    String name;
//}
import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

//
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


    @Column(nullable = false)
    @NotBlank(message = "image không được bỏ trống")
    private String image;

    @Column
    private String description;

    @OneToMany(
            mappedBy = "specialty",
            cascade = CascadeType.ALL,
            fetch = FetchType.LAZY
    )
    @JsonManagedReference
    private List<DoctorEntity> doctors = new ArrayList<>();

    public SpecialtyEntity(SpecialtyEntity specialty) {
    }

    public void addDoctor(DoctorEntity doctor) {
        doctors.add(doctor);
        doctor.setSpecialty(this);
    }
    public void removeDoctor(DoctorEntity doctor) {
        doctors.remove(doctor);
        doctor.setSpecialty(null);
    }

}
