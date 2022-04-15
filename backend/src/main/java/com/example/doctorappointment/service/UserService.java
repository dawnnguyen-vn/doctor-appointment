package com.example.doctorappointment.service;

import com.example.doctorappointment.DTO.user.UserDTO;
import com.example.doctorappointment.entity.RoleEntity;
import com.example.doctorappointment.entity.UserEntity;

import java.util.List;

public interface
UserService {
    boolean exists(String username);
    UserDTO saveUser(UserEntity user);
    RoleEntity saveRole(RoleEntity role);
    void addRoleToUser(String username, String roleName);
    UserEntity getUser(String username);
    List<UserDTO> getUsers();
    String getUsername();
}
