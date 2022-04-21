package com.example.doctorappointment.controller.enpointAPI;

import com.example.doctorappointment.DTO.user.UserDTO;
import com.example.doctorappointment.entity.UserEntity;
import com.example.doctorappointment.service.UserService;
import com.example.doctorappointment.utility.Config;
import com.example.doctorappointment.utility.CustomException;
import com.example.doctorappointment.utility.DataMapperUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;

@RestController
@RequiredArgsConstructor
@RequestMapping(path = "${APIVersion}/user")
public class UserController {

    private final UserService userService;
    private final DataMapperUtils dataMapperUtils;

    @GetMapping("/exist/{username}")
    public ResponseEntity<Boolean> checkUserExist(@PathVariable String email) {
        return ResponseEntity.ok().body(userService.exists(email));
    }

    @GetMapping("/{email}")
    public ResponseEntity<UserDTO> getUser(@PathVariable String email) throws CustomException {
        if (!userService.exists(email)) {
            throw new CustomException("Email không tồn tại, hãy kiểm tra lại", HttpStatus.BAD_REQUEST);
        }
        return ResponseEntity.ok().body(dataMapperUtils.map(userService.getUser(email), UserDTO.class));
    }

    @GetMapping("/isactive/{email}")
    public ResponseEntity<Boolean> checkUserIsActive(@PathVariable String email) throws CustomException {
        if (!userService.exists(email)) {
            throw new CustomException("Email không tồn tại, hãy kiểm tra lại", HttpStatus.BAD_REQUEST);
        }
        boolean isActive = userService.getUser(email).isActive();
        return ResponseEntity.ok().body(isActive);
    }

//    @PostMapping("/doctor/register")
//    public ResponseEntity<UserDTO> saveDoctor(@Valid @RequestBody UserEntity user) throws CustomException {
//        if (userService.exists(user.getEmail())) {
//            throw new CustomException("Email đã tồn tại trên hệ thống", HttpStatus.BAD_REQUEST);
//        }
//        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path(null).toUriString());
//        userService.saveUser(user);
//        userService.addRoleToUser(user.getEmail(), Config.ROLE.DOCTOR.getValue());
//        return ResponseEntity.created(uri).body(dataMapperUtils.map(userService.getUser(user.getEmail()), UserDTO.class));
//    }


}


