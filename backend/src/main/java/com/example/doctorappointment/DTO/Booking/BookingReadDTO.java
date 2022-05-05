package com.example.doctorappointment.DTO.Booking;

import com.example.doctorappointment.entity.PatientEntity;
import com.example.doctorappointment.entity.TimeEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookingReadDTO {

    private int id;
    private String bookingStatus;
    private int doctorId;
    private Date date;
    private TimeEntity time;
    private PatientEntity patient;
}