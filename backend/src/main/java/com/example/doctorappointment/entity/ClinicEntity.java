package com.example.doctorappointment.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.ArrayList;
import java.util.List;

import static javax.persistence.FetchType.LAZY;

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

    @OneToOne(fetch = LAZY)
    private ClinicMarkdownEntity markdown;

    @Column(nullable = false)
    @NotBlank(message = "image không được bỏ trống")
    private String image;

    @Column()
    private int adminId;

    @JsonIgnore
    @OneToMany(
            mappedBy = "clinic",
            cascade = CascadeType.MERGE,
            fetch = FetchType.EAGER
    )
    private List<SpecialtyEntity> specialties = new ArrayList<>();

    public void addSpecialty(SpecialtyEntity specialty){
        specialties.add(specialty);
        specialty.setClinic(this);
    }

}
