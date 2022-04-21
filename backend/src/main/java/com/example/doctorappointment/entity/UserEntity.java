package com.example.doctorappointment.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

import static javax.persistence.FetchType.EAGER;

@Entity
@Data @NoArgsConstructor @AllArgsConstructor
@Table(name = "users")
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(unique = true, nullable = false)
    @NotBlank(message = "Email không được bỏ trống")
    @Email(message = "Email sai định dạng")
    private String email;

    @Column(name = "_password")
    @NotBlank(message = "Mật khẩu không được bỏ trống")
    private String password;

    @Column(nullable = false)
    private boolean isActive ;

    @ManyToOne(fetch = EAGER)
    private RoleEntity role;

}

