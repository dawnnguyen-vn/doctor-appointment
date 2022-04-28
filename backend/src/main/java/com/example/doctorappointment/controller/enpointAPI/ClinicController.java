package com.example.doctorappointment.controller.enpointAPI;

import com.example.doctorappointment.DTO.doctor.DoctorReadDTO;
import com.example.doctorappointment.entity.ClinicEntity;
import com.example.doctorappointment.service.ClinicService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(path = "${APIVersion}/clinic")
public class ClinicController {

    private final ClinicService clinicService;

    @GetMapping("/all")
    public ResponseEntity<List<ClinicEntity>> checkUserExist() {
        return ResponseEntity.ok().body(clinicService.findAll());
    }

}
