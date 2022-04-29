package com.example.doctorappointment.service;

import com.example.doctorappointment.DTO.BookingDTO;

import java.util.*;

public interface BookingService {
    BookingDTO save(BookingDTO bookingDTO);

    List<BookingDTO> findAll();
}
