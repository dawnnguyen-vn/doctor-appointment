package com.example.doctorappointment.controller.enpointAPI;

import com.example.doctorappointment.DTO.ScheduleDTO;
import com.example.doctorappointment.entity.ScheduleEntity;
import com.example.doctorappointment.entity.TimeEntity;
import com.example.doctorappointment.repository.DoctorRepo;
import com.example.doctorappointment.repository.ScheduleRepo;
import com.example.doctorappointment.repository.TimeRepo;
import com.example.doctorappointment.service.ScheduelService;
import com.example.doctorappointment.utility.DataMapperUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(path = "${APIVersion}/schedule")
public class ScheduleController {

    private final TimeRepo timeRepo;
    private final ScheduelService scheduelService;
    @GetMapping("/times")
    public ResponseEntity<List<TimeEntity>> getAllTime(){
        return ResponseEntity.ok().body(timeRepo.findAll());
    }

    @PostMapping("/")
    public ResponseEntity<List<ScheduleEntity>> saveAllSchedule(@RequestBody List<ScheduleDTO> list){
        return  ResponseEntity.ok().body(scheduelService.saveAll(list));
    }

    @GetMapping("/")
    public ResponseEntity<List<ScheduleDTO>> getAll(){
        return ResponseEntity.ok().body(scheduelService.getAll());
    }
}
