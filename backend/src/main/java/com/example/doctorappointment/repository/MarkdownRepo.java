package com.example.doctorappointment.repository;

import com.example.doctorappointment.entity.DoctorEntity;
import com.example.doctorappointment.entity.MarkdownEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MarkdownRepo extends JpaRepository<MarkdownEntity, Integer> {
    MarkdownEntity findByDoctorId(int doctorId);
    MarkdownEntity findBySpecialtyId(int specialtyId);
    MarkdownEntity findByClinicId(int clinicId);
}
