package com.example.doctorappointment.service;

import com.example.doctorappointment.DTO.user.UserDTO;
import com.example.doctorappointment.entity.UserEntity;
import com.example.doctorappointment.entity.RoleEntity;

import java.util.List;

public interface
UserService {
    boolean exists(String email);
    UserDTO saveUser(UserEntity user);
    RoleEntity saveRole(RoleEntity role);
    void addRoleToUser(String username, String roleName);
    List<UserDTO> getUsers();
    UserEntity getUser(String email);
    boolean delete(int userId);
    String getEmail();
}
