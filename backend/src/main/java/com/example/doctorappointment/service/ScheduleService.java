package com.example.doctorappointment.service;

import com.example.doctorappointment.DTO.schedule.ScheduleReadDTO;
import com.example.doctorappointment.DTO.schedule.ScheduleWriteDTO;

import java.util.List;

public interface ScheduleService {
    ScheduleReadDTO save(ScheduleWriteDTO newSchedule);

    List<ScheduleReadDTO> findByDoctorAndDate(int doctorId, int date);

    List<ScheduleReadDTO> findByDoctor(int doctorId);
}
