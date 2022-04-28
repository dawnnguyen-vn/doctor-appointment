package com.example.doctorappointment.repository;

import com.example.doctorappointment.entity.ScheduleEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ScheduleRepo extends JpaRepository<ScheduleEntity, Integer> {
}
