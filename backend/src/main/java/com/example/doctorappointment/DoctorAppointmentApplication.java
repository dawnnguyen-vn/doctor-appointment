package com.example.doctorappointment;

import com.example.doctorappointment.entity.*;
import com.example.doctorappointment.repository.*;

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
    public ModelMapper modelMapper() {
        return new ModelMapper();
    }

    @Bean
    public ObjectMapper objectMapper() {
        return new ObjectMapper();
    }

    @Bean
    CommandLineRunner run(UserService userService, SpecialtyRepo repo, ClinicRepo clinicRepo, PositionRepo positionRepo,TimeRepo timeRepo) {

        return args -> {
//            userService.saveRole(new RoleEntity(0, Config.ROLE.DOCTOR.getValue()));
//            userService.saveRole(new RoleEntity(0, Config.ROLE.ADMIN.getValue()));
//            userService.saveRole(new RoleEntity(0, Config.ROLE.PATIENT.getValue()));
////
//            userService.saveUser(new UserEntity(0, "danh@gmail.com", "1234", true, null));
//            userService.addRoleToUser("danh@gmail.com", Config.ROLE.ADMIN.getValue());
//            repo.save(new SpecialtyEntity(0, "Cơ xương khớp", "co xuong khop", "https://cdn.bookingcare.vn/fr/w300/2019/12/13/120331-co-xuong-khop.jpg", null));
//            repo.save(new SpecialtyEntity(0, "Thần kinh", "than kinh", "https://cdn.bookingcare.vn/fr/w300/2019/12/13/121042-than-kinh.jpg", null));
//            clinicRepo.save(new ClinicEntity(0, "Bệnh viện Hữu nghị Việt Đức", "addreess", "description", "https://cdn.bookingcare.vn/fr/w300/2019/12/13/121042-than-kinh.jpg", null));
//            clinicRepo.save(new ClinicEntity(0, "Bệnh viện Chợ Rẫy", "addreess", "description", "https://cdn.bookingcare.vn/fr/w300/2019/12/13/121042-than-kinh.jpg", null));
//            clinicRepo.save(new ClinicEntity(0, "Phòng khám Bệnh viện Đại học Y Dược 1", "addreess", "description", "https://cdn.bookingcare.vn/fr/w300/2019/12/13/121042-than-kinh.jpg", null));
//            clinicRepo.save(new ClinicEntity(0, "Bệnh viện K - Cơ sở Phan Chu Trinh", "addreess", "description", "https://cdn.bookingcare.vn/fr/w300/2019/12/13/121042-than-kinh.jpg", null));
//            positionRepo.save(new PositionEntity(0, "Thạc sĩ"));
//            positionRepo.save(new PositionEntity(0, "Tiến sĩ"));
//            positionRepo.save(new PositionEntity(0, "Giáo sư"));
//            positionRepo.save(new PositionEntity(0, "Phó giáo sư"));
//            timeRepo.save(new TimeEntity(0,"08:00 - 08:30"));
//            timeRepo.save(new TimeEntity(0,"08:30 - 09:00"));
//            timeRepo.save(new TimeEntity(0,"09:00 - 10:30"));
//            timeRepo.save(new TimeEntity(0,"10:30 - 11:00"));
//            timeRepo.save(new TimeEntity(0,"11:00 - 11:30"));
//            timeRepo.save(new TimeEntity(0,"13:30 - 14:00"));
//            timeRepo.save(new TimeEntity(0,"14:00 - 14:30"));
//            timeRepo.save(new TimeEntity(0,"14:30 - 15:00"));
//            timeRepo.save(new TimeEntity(0,"15:00 - 15:30"));
//            timeRepo.save(new TimeEntity(0,"15:30 - 16:00"));
        };
    }
}
