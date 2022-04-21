package com.example.doctorappointment;

import com.example.doctorappointment.entity.RoleEntity;
import com.example.doctorappointment.entity.SpecialtyEntity;
import com.example.doctorappointment.entity.UserEntity;
import com.example.doctorappointment.repository.SpecialtyRepo;
import com.example.doctorappointment.service.UserService;
import com.example.doctorappointment.utility.Config;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.http.CacheControl;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;

import java.util.HashSet;
import java.util.concurrent.TimeUnit;

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
    CommandLineRunner run(UserService userService, SpecialtyRepo repo){
        return args -> {
//            userService.saveRole(new RoleEntity( Config.ROLE.USER.getValue()));
//            userService.saveRole(new RoleEntity( Config.ROLE.ADMIN.getValue()));
//
//            userService.saveUser(new UserEntity("Nguyen Huu Canh ", "canh","0988766765" ,"1234", true,new HashSet<>()));
//            //userService.addRoleToUser("john", Config.ROLE.USER.getValue());
//            userService.addRoleToUser("canh", Config.ROLE.ADMIN.getValue());
//            userService.addRoleToUser("canh", Config.ROLE.USER.getValue());
//
//            userService.saveUser(new UserEntity("sdf dsfsd sdf", "john", "8767898789","1234",true, new HashSet<>()));
//            userService.addRoleToUser("john", Config.ROLE.USER.getValue());
//
//            repo.save(new SpecialtyEntity("Cơ xương khớp","https://cdn.bookingcare.vn/fr/w300/2019/12/13/120331-co-xuong-khop.jpg","Cơ xương khớp"));
        };
    }
}
