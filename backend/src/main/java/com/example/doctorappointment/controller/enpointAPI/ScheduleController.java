package com.example.doctorappointment.controller.enpointAPI;

import com.example.doctorappointment.DTO.schedule.ScheduleReadDTO;
import com.example.doctorappointment.DTO.schedule.ScheduleWriteDTO;
import com.example.doctorappointment.service.ScheduleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(path = "${APIVersion}/schedule")
public class ScheduleController {

    private final ScheduleService scheduleService;

    @PostMapping("/create")
    public ResponseEntity<ScheduleReadDTO> createSpecialty(@RequestBody ScheduleWriteDTO newSchedule) {
        return ResponseEntity.ok().body(scheduleService.save(newSchedule));
    }

    @GetMapping("/get")
    public ResponseEntity<List<ScheduleReadDTO>> findByDoctorAndDate(@RequestParam int doctorId,
                                                                         @RequestParam int date) {
        return ResponseEntity.ok().body(scheduleService.findByDoctorAndDate(doctorId, date));
    }

    @GetMapping("/all")
    public ResponseEntity<List<ScheduleReadDTO>> findByDoctor(@RequestParam int doctorId) {
        return ResponseEntity.ok().body(scheduleService.findByDoctor(doctorId));
    }

}
