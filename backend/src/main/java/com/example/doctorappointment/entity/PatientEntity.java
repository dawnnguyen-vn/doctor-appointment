package com.example.doctorappointment.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import java.util.Date;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "patient")
public class PatientEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    @NotBlank(message = "Email không được bỏ trống")
    @Email(message = "Email sai định dạng")
    private String email;

    @Column(nullable = false)
    @NotBlank(message = "Số điện thoại không được bỏ trống")
    private String phone;

    @Column(nullable = false)
    @NotBlank(message = "Họ và tên không được bỏ trống")
    private String name;

    @Column(nullable = false)
    private String reason;

    @Column(nullable = false)
    private Date dateOfBirth;

    @Column(nullable = false)
    private String address;

    @Column(nullable = false)
    private boolean gender;
}
