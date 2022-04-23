package com.example.doctorappointment.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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
@Table(name = "clinics")
public class ClinicEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    @NotBlank(message = "Tên không được bỏ trống")
    private String name;

    @Column(nullable = false)
    @NotBlank(message = "Địa chỉ không được bỏ trống")
    private String address;

    @Column
    private String description;

    @Column(nullable = false)
    @NotBlank(message = "image không được bỏ trống")
    private String image;

    @OneToMany(
            mappedBy = "clinic",
            cascade = CascadeType.ALL,
            fetch = FetchType.LAZY
    )
    @JsonManagedReference
    private List<DoctorEntity> doctors = new ArrayList<>();


    public void addDoctor(DoctorEntity doctor) {
        doctors.add(doctor);
        doctor.setClinic(this);
    }

    public void removeDoctor(DoctorEntity doctor) {
        doctors.remove(doctor);
        doctor.setClinic(null);
    }

}
