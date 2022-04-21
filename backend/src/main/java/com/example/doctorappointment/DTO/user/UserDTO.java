package com.example.doctorappointment.DTO.user;

import com.example.doctorappointment.entity.RoleEntity;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserDTO {
    private String email;
    private boolean isActive;
    private String phone;
    private RoleEntity role;
}
