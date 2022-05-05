package com.example.doctorappointment.repository;

import com.example.doctorappointment.entity.TimeEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.persistence.Id;

public interface TimeRepo extends JpaRepository<TimeEntity,Integer> {
    TimeEntity findById(int id);
}
