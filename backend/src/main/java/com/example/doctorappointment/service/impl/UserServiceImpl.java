package com.example.doctorappointment.service.impl;

import com.example.doctorappointment.entity.UserEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import com.example.doctorappointment.DTO.user.UserDTO;
import com.example.doctorappointment.entity.RoleEntity;
import com.example.doctorappointment.repository.RoleRepo;
import com.example.doctorappointment.repository.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.example.doctorappointment.service.UserService;
import com.example.doctorappointment.utility.Config;
import com.example.doctorappointment.utility.DataMapperUtils;

import javax.transaction.Transactional;
import java.util.*;


@Service
@Transactional
@RequiredArgsConstructor
public class UserServiceImpl implements UserService, UserDetailsService {

    private final UserRepo userRepo;
    private final RoleRepo roleRepo;
    private final PasswordEncoder passwordEncoder;
    private final DataMapperUtils dataMapperUtils;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        UserEntity user  = userRepo.findByEmail(email);
        if (user==null){
            throw new UsernameNotFoundException("UserEntity not found in the database");
        }
        Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
        RoleEntity role = user.getRole();
        authorities.add(new SimpleGrantedAuthority(role.getName()));
        return new org.springframework.security.core.userdetails.User(user.getEmail(),user.getPassword(),authorities);
    }

    @Override
    public boolean exists(String email) {
        return userRepo.existsByEmail(email);
    }

    @Override
    public UserDTO saveUser(UserEntity user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setActive(true);
        UserEntity userResult = userRepo.save(user);
        return dataMapperUtils.map(userResult,UserDTO.class);
    }

    @Override
    public RoleEntity saveRole(RoleEntity role) {
        return roleRepo.save(role);
    }

    @Override
    public void addRoleToUser(String email, String roleName) {
        UserEntity userEntity =  userRepo.findByEmail(email);
        RoleEntity roleEntity = roleRepo.findByName(roleName);
        userEntity.setRole(roleEntity);
    }

    @Override
    public List<UserDTO> getUsers() {
        return dataMapperUtils.mapAll(userRepo.findAll(),UserDTO.class);
    }

    @Override
    public UserEntity getUser(String email) {
        return userRepo.findByEmail(email);
    }

    @Override
    public boolean delete(int userId) {
        if(userRepo.findById(userId)!=null){
            userRepo.deleteById(userId);
            return true;
        }
        return false;
    }

//    @Override
//    public List<UserDTO> getUsers() {
//        Set<RoleEntity> roles = new HashSet();
//        RoleEntity roleEntity = roleRepo.findByName(Config.ROLE.USER.getValue());
//        roles.add(roleEntity);
//        List<UserEntity> users = userRepo.findAllByRolesIn(roles);
//        return dataMapperUtils.mapAll(users,UserDTO.class);
//    }

    @Override
    public String getEmail() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated()) {
            return null;
        }
        return  authentication.getName();
    }

}
