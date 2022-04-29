package com.example.doctorappointment.repository;

import com.example.doctorappointment.entity.BookingEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.*;

public interface BookingRepo extends JpaRepository<BookingEntity, Integer> {
    List<BookingEntity> findAll();
}
