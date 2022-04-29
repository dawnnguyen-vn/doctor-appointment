package com.example.doctorappointment.repository;

import com.example.doctorappointment.entity.ScheduleEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;

public interface ScheduleRepo extends JpaRepository<ScheduleEntity,Integer> {
    List<ScheduleEntity> findAllByDateAndDoctorId(Date date, int doctorId);
}
