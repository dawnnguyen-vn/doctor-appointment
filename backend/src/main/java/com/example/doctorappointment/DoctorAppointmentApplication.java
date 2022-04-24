package com.example.doctorappointment;

import com.example.doctorappointment.entity.*;
import com.example.doctorappointment.repository.ClinicRepo;
import com.example.doctorappointment.repository.MarkdownRepo;
import com.example.doctorappointment.repository.PositionRepo;
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
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

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
    CommandLineRunner run(UserService userService, SpecialtyRepo repo , ClinicRepo clinicRepo, PositionRepo positionRepo, MarkdownRepo markdownRepo){
        return args -> {
            userService.saveRole(new RoleEntity(0, Config.ROLE.DOCTOR.getValue()));
            userService.saveRole(new RoleEntity(0, Config.ROLE.ADMIN.getValue()));
            userService.saveRole(new RoleEntity(0, Config.ROLE.PATIENT.getValue()));
//
            userService.saveUser(new UserEntity(0, "danh@gmail.com", "1234",  true, null));
            userService.addRoleToUser("danh@gmail.com", Config.ROLE.DOCTOR.getValue());
            repo.save(new SpecialtyEntity(0,"Cơ xương khớp","https://cdn.bookingcare.vn/fr/w300/2019/12/13/120331-co-xuong-khop.jpg","Cơ xương khớp",null));
            repo.save(new SpecialtyEntity(0,"Thần kinh","https://cdn.bookingcare.vn/fr/w300/2019/12/13/121042-than-kinh.jpg","Thần kinh",null));
            clinicRepo.save(new ClinicEntity(0,"Bệnh viện Hữu nghị Việt Đức","addreess","description","https://cdn.bookingcare.vn/fr/w300/2019/12/13/121042-than-kinh.jpg",null));
            clinicRepo.save(new ClinicEntity(0,"Bệnh viện Chợ Rẫy","addreess","description","https://cdn.bookingcare.vn/fr/w300/2019/12/13/121042-than-kinh.jpg",null));
            clinicRepo.save(new ClinicEntity(0,"Phòng khám Bệnh viện Đại học Y Dược 1","addreess","description","https://cdn.bookingcare.vn/fr/w300/2019/12/13/121042-than-kinh.jpg",null));
            clinicRepo.save(new ClinicEntity(0,"Bệnh viện K - Cơ sở Phan Chu Trinh","addreess","description","https://cdn.bookingcare.vn/fr/w300/2019/12/13/121042-than-kinh.jpg",null));
            positionRepo.save(new PositionEntity(0,"Thạc sĩ"));
            positionRepo.save(new PositionEntity(0,"Tiến sĩ"));
            positionRepo.save(new PositionEntity(0,"Giáo sư"));
            positionRepo.save(new PositionEntity(0,"Phó giáo sư"));
            markdownRepo.save(new MarkdownEntity(0,"asd","asd","asdasdas",1,0,0));
        };
    }
}
