package com.example.doctorappointment.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.ArrayList;
import java.util.List;

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

    @OneToMany(
            mappedBy = "specialty",
            cascade = CascadeType.ALL,
            fetch = FetchType.LAZY
    )
    @JsonManagedReference
    private List<DoctorEntity> doctors = new ArrayList<>();

    public void addDoctor(DoctorEntity doctor) {
        doctors.add(doctor);
        doctor.setSpecialty(this);
    }

    public void removeDoctor(DoctorEntity doctor) {
        doctors.remove(doctor);
        doctor.setSpecialty(null);
    }

}
