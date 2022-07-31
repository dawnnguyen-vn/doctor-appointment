package com.example.doctorappointment.service;

import com.example.doctorappointment.DTO.ScheduleDTO;
import com.example.doctorappointment.entity.ScheduleEntity;

import java.util.Date;
import java.util.List;

public interface ScheduelService {

    List<ScheduleEntity> saveAll(List<ScheduleDTO> list);
    List<ScheduleDTO> getAll();

    List<ScheduleDTO> getScheduleByDate(int doctorId , Date date);

    boolean isExists(int doctorId,Date date,int timeId);

}
