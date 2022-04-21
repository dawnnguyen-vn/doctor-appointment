package com.example.doctorappointment;

import com.example.doctorappointment.entity.UserEntity;
import com.example.doctorappointment.entity.RoleEntity;
import com.example.doctorappointment.service.UserService;
import com.example.doctorappointment.utility.Config;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.HashSet;

@SpringBootApplication
public class DoctorAppointmentApplication {
    @Value("${FilePath}")

    public static void main(String[] args) {
        SpringApplication.run(DoctorAppointmentApplication.class, args);
    }


    @Bean
    BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public ModelMapper modelMapper(){
        return new ModelMapper();
    }

    @Bean
    public ObjectMapper objectMapper() {return  new ObjectMapper();}

    @Bean
    CommandLineRunner run(UserService userService){
        return args -> {
            userService.saveRole(new RoleEntity(0, Config.ROLE.DOCTOR.getValue()));
            userService.saveRole(new RoleEntity(0, Config.ROLE.ADMIN.getValue()));
            userService.saveRole(new RoleEntity(0, Config.ROLE.PATIENT.getValue()));

            userService.saveUser(new UserEntity(0, "danh@gmail.com", "1234",  true, null));
            userService.addRoleToUser("danh@gmail.com", Config.ROLE.DOCTOR.getValue());
        };
    }
}
