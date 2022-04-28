package com.example.doctorappointment.service.impl;

import com.example.doctorappointment.DTO.schedule.ScheduleReadDTO;
import com.example.doctorappointment.DTO.schedule.ScheduleWriteDTO;
import com.example.doctorappointment.entity.DoctorEntity;
import com.example.doctorappointment.entity.DoctorTimeEntity;
import com.example.doctorappointment.entity.ScheduleEntity;
import com.example.doctorappointment.repository.ScheduleRepo;
import com.example.doctorappointment.service.DoctorService;
import com.example.doctorappointment.service.DoctorTimeService;
import com.example.doctorappointment.service.ScheduleService;
import com.example.doctorappointment.utility.DataMapperUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class ScheduleServiceImpl implements ScheduleService {

    private final ScheduleRepo scheduleRepo;
    private final DoctorService doctorService;
    private final DoctorTimeService doctorTimeService;
    private final DataMapperUtils mapper;

    @Override
    public ScheduleReadDTO save(ScheduleWriteDTO newSchedule) {
        ScheduleEntity scheduleEntity = scheduleRepo.save(convertDTOToEntity(newSchedule));
        return convertEntityToDTO(scheduleEntity);
    }

    @Override
    public boolean updateScheduleDoctor(int timeId, int doctorId, int date) {
        DoctorTimeEntity doctorTime = doctorTimeService.findById(timeId);
        DoctorEntity doctor = doctorService.findById(doctorId);
        ScheduleEntity scheduleEntity = scheduleRepo.findAllByDateAndDoctor(date, doctor);
        if(scheduleEntity.getDoctorTimes().contains(doctorTime)){
            scheduleEntity.getDoctorTimes().remove(doctorTime);
            return true;
        }
        return false;
    }

    @Override
    public ScheduleReadDTO findByDoctorAndDate(int doctorId, int date) {
        DoctorEntity doctor = doctorService.findById(doctorId);
        ScheduleEntity scheduleEntities = scheduleRepo.findAllByDateAndDoctor(date, doctor);
        return convertEntityToDTO(scheduleEntities);
    }

    @Override
    public List<ScheduleReadDTO> findByDoctor(int doctorId) {
        DoctorEntity doctor = doctorService.findById(doctorId);
        List<ScheduleEntity> scheduleEntities = scheduleRepo.findAllByDoctor(doctor);
        List<ScheduleReadDTO> scheduleReadDTOS = new ArrayList<>();
        scheduleEntities.forEach(scheduleEntity -> {
            ScheduleReadDTO scheduleReadDTO = convertEntityToDTO(scheduleEntity);
            scheduleReadDTOS.add(scheduleReadDTO);
        });
        return scheduleReadDTOS;
    }

    private ScheduleEntity convertDTOToEntity(ScheduleWriteDTO newSchedule) {
        ScheduleEntity scheduleEntity = new ScheduleEntity();
        scheduleEntity.setDate(newSchedule.getDate());
        DoctorEntity doctor = doctorService.findById(newSchedule.getDoctorId());
        scheduleEntity.setDoctor(doctor);
        newSchedule.getDoctorTimes().forEach(
                doctorTime -> {
                    DoctorTimeEntity doctorTimeEntity = doctorTimeService.findById(doctorTime);
                    scheduleEntity.getDoctorTimes().add(doctorTimeEntity);
                }
        );

        return scheduleEntity;
    }

    private ScheduleReadDTO convertEntityToDTO(ScheduleEntity scheduleEntity) {
        ScheduleReadDTO scheduleReadDTO = mapper.map(scheduleEntity, ScheduleReadDTO.class);
        scheduleReadDTO.setDoctorId(scheduleEntity.getDoctor().getId());
        return scheduleReadDTO;
    }
}
