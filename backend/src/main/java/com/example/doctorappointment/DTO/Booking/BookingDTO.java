package com.example.doctorappointment.DTO.Booking;

import com.example.doctorappointment.entity.DoctorEntity;
import com.example.doctorappointment.entity.PatientEntity;
import com.example.doctorappointment.entity.UserEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookingDTO {
    private int id;
    private String bookingStatus;
    private int doctorId;
    private int clinicId;
    private Date date;
    private int scheduleId;
    private int timeId;
    private PatientEntity patient;

}
