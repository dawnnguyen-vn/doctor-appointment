package com.example.doctorappointment.service.impl;

import com.example.doctorappointment.DTO.BookingDTO;
import com.example.doctorappointment.entity.BookingEntity;
import com.example.doctorappointment.entity.DoctorEntity;
import com.example.doctorappointment.entity.PatientEntity;
import com.example.doctorappointment.repository.BookingRepo;
import com.example.doctorappointment.service.BookingService;
import com.example.doctorappointment.service.DoctorService;
import com.example.doctorappointment.service.PatientService;
import com.example.doctorappointment.utility.DataMapperUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class BookingServiceImpl implements BookingService {

    private final BookingRepo bookingRepo;
    private final DataMapperUtils mapper;
    private final DoctorService doctorService;
    private final PatientService patientService;

    @Override
    public BookingDTO save(BookingDTO bookingDTO) {
        BookingEntity bookingEntity = convertDTOToEntity(bookingDTO);
        return convertEntityToDTO(bookingRepo.save(bookingEntity));
    }

    @Override
    public List<BookingDTO> findAll() {
        List<BookingDTO> bookingDTOS = new ArrayList<>();
        List<BookingEntity> bookingEntities = bookingRepo.findAll();
        bookingEntities.forEach(bookingEntity -> {
            bookingDTOS.add(convertEntityToDTO(bookingEntity));
        });
        return bookingDTOS;
    }

    private BookingDTO convertEntityToDTO(BookingEntity bookingEntity) {
        BookingDTO bookingDTO = mapper.map(bookingEntity, BookingDTO.class);
        bookingDTO.setDoctorId(bookingEntity.getDoctor().getId());
        return bookingDTO;
    }

    private BookingEntity convertDTOToEntity(BookingDTO bookingDTO) {
        BookingEntity bookingEntity = mapper.map(bookingDTO, BookingEntity.class);
        DoctorEntity doctor = doctorService.findById(bookingDTO.getDoctorId());
        bookingEntity.setDoctor(doctor);
        PatientEntity newPatient = patientService.save(bookingDTO.getPatient());
        bookingEntity.setPatient(newPatient);
        return bookingEntity;
    }


}
