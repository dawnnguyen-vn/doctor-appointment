package com.example.doctorappointment.repository;

import com.example.doctorappointment.entity.BookingEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookingRepo extends JpaRepository<BookingEntity, Integer> {
}
