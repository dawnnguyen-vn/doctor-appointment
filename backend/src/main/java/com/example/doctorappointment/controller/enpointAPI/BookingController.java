package com.example.doctorappointment.controller.enpointAPI;

import com.example.doctorappointment.DTO.BookingDTO;
import com.example.doctorappointment.DTO.ScheduleDTO;
import com.example.doctorappointment.entity.ClinicEntity;
import com.example.doctorappointment.entity.ScheduleEntity;
import com.example.doctorappointment.entity.TimeEntity;
import com.example.doctorappointment.repository.DoctorRepo;
import com.example.doctorappointment.repository.ScheduleRepo;
import com.example.doctorappointment.repository.TimeRepo;
import com.example.doctorappointment.service.BookingService;
import com.example.doctorappointment.service.ScheduelService;
import com.example.doctorappointment.utility.DataMapperUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(path = "${APIVersion}/booking")
public class BookingController {

    private final BookingService bookingService;

    @PostMapping("/create")
    public ResponseEntity<BookingDTO> saveAllSchedule(@RequestBody BookingDTO bookingDTO){
        return  ResponseEntity.ok().body(bookingService.save(bookingDTO));
    }

    @GetMapping("/all")
    public ResponseEntity<List<BookingDTO>> findAll() {
        return ResponseEntity.ok().body(bookingService.findAll());
    }

}
