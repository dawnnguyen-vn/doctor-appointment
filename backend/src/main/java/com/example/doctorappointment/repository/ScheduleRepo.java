package com.example.doctorappointment.repository;

import com.example.doctorappointment.entity.DoctorEntity;
import com.example.doctorappointment.entity.ScheduleEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ScheduleRepo extends JpaRepository<ScheduleEntity, Integer> {

    ScheduleEntity findAllByDateAndDoctor(int date, DoctorEntity doctor);
    List<ScheduleEntity> findAllByDoctor(DoctorEntity doctor);

}
