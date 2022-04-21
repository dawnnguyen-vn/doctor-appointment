package com.example.doctorappointment.controller.enpointAPI;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.example.doctorappointment.DTO.Message;
import com.example.doctorappointment.DTO.user.UserDTO;
import com.example.doctorappointment.entity.UserEntity;
import com.example.doctorappointment.service.UserService;
import com.example.doctorappointment.utility.Config;
import com.example.doctorappointment.utility.CustomException;
import com.example.doctorappointment.utility.DataMapperUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;

import static java.util.Arrays.stream;
import static org.springframework.http.HttpHeaders.AUTHORIZATION;

@RestController @RequiredArgsConstructor @RequestMapping(path = "${APIVersion}/user") @Validated
public class UserController {

    private final UserService userService;
    private final DataMapperUtils dataMapperUtils;

    @GetMapping("/exist/{username}")
    public ResponseEntity<Boolean> checkUserExist(@PathVariable String username) {
        return   ResponseEntity.ok().body(userService.exists(username));
    }

    @GetMapping("/{username}")
    public ResponseEntity<UserDTO> getUser(@PathVariable String username) throws CustomException {
        if(!userService.exists(username)){
            throw new CustomException("Username không tồn tại, hãy kiểm tra lại", HttpStatus.BAD_REQUEST);
        }
        return ResponseEntity.ok().body(dataMapperUtils.map(userService.getUser(username), UserDTO.class));
    }

    @GetMapping("/isactive/{username}")
    public ResponseEntity<Boolean> checkUserIsActive(@PathVariable String username) throws CustomException {
        if(!userService.exists(username)){
            throw new CustomException("Username không tồn tại, hãy kiểm tra lại", HttpStatus.BAD_REQUEST);
        }
        boolean isActive = userService.getUser(username).isActive();
        return ResponseEntity.ok().body(isActive);
    }

    @PostMapping("/register")
    public ResponseEntity<UserDTO> saveUser(@Valid @RequestBody UserEntity user) throws CustomException {
        if(userService.exists(user.getUsername())){
            throw new CustomException("Tên tài khoản đã tồn tại trên hệ thống", HttpStatus.BAD_REQUEST);
        }
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path(null).toUriString());
        userService.saveUser(user);
        userService.addRoleToUser(user.getUsername(), Config.ROLE.USER.getValue());
        return ResponseEntity.created(uri).body(dataMapperUtils.map(userService.getUser(user.getUsername()), UserDTO.class));
    }

    @GetMapping("/userLogin")
    public ResponseEntity<Message> getUserLogin(Authentication auth){
        return ResponseEntity.status(HttpStatus.OK).body(new Message(new Date(),"ok","",userService.getUser(auth.getName())));
    }
    @GetMapping("/all")
    public ResponseEntity<List<UserDTO>> getUsers() {
        return ResponseEntity.ok().body(userService.getUsers());
    }

}


