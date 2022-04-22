package com.example.doctorappointment.DTO.user;

import com.example.doctorappointment.entity.RoleEntity;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
public class UserDTO {
    private int id;
    private String name;
    private int createdAt;
    private boolean isActive ;
    private String email;
    private String phone;
    private RoleEntity role;
}
