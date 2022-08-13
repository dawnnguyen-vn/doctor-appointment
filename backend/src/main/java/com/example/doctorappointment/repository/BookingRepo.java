package com.example.doctorappointment.repository;

import com.example.doctorappointment.entity.BookingEntity;
import com.example.doctorappointment.entity.PatientEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.*;

public interface BookingRepo extends JpaRepository<BookingEntity, Integer> {
    List<BookingEntity> findAll();

    @Query(value = "select * from booking b left join patient p on b.patient_id = p.id where p.phone = ?1", nativeQuery = true )
    List<BookingEntity> findAllByPatient(String phone);
    BookingEntity findByToken(String token);
    BookingEntity findById(int id);
    BookingEntity findByPatientEmailAndDate(String email,Date date);

    List<BookingEntity> findAllByDateAndDoctorIdAndBookingStatus(Date date , int doctorId,String status);
    List<BookingEntity> findAllByDateAndClinicIdAndBookingStatus(Date date , int clinicId,String status);




}
