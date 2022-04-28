package com.example.doctorappointment.controller.enpointAPI;

import com.example.doctorappointment.DTO.BookingDTO;
import com.example.doctorappointment.service.BookingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping(path = "${APIVersion}/booking")
public class BookingController {

    private final BookingService bookingService;

    @PostMapping("/create")
    public ResponseEntity<BookingDTO> checkUserExist(@RequestBody BookingDTO bookingDTO) {
        return ResponseEntity.ok().body(bookingService.save(bookingDTO));
    }

}
