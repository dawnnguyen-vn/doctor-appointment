package com.example.doctorappointment.service.impl;

import com.example.doctorappointment.DTO.ScheduleDTO;
import com.example.doctorappointment.entity.ScheduleEntity;
import com.example.doctorappointment.repository.DoctorRepo;
import com.example.doctorappointment.repository.ScheduleRepo;
import com.example.doctorappointment.repository.TimeRepo;
import com.example.doctorappointment.service.ScheduelService;
import com.example.doctorappointment.utility.DataMapperUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.concurrent.atomic.AtomicBoolean;

@Service
@RequiredArgsConstructor
public class ScheduleServiceImpl implements ScheduelService {
    private final DataMapperUtils dataMapperUtils;
    private final ScheduleRepo scheduleRepo;
    private final DoctorRepo doctorRepo;
    private final TimeRepo timeRepo;

    @Override
    public List<ScheduleEntity> saveAll(List<ScheduleDTO> list) {
        List<ScheduleEntity> result = new ArrayList<>();
        list.forEach(scheduleDTO ->
                {
                    ScheduleEntity schedule = dataMapperUtils.map(scheduleDTO, ScheduleEntity.class);
                    List<ScheduleEntity> schedulesOfOneDate = scheduleRepo.findAllByDateAndDoctorId(scheduleDTO.getDate(), scheduleDTO.getDoctorId());
                    if (schedulesOfOneDate.size() > 0) {
                        System.out.println("lít > 0");
                        if (!checkContainsSchedule(schedulesOfOneDate,schedule.getTimeId())) {
                            System.out.println(schedulesOfOneDate);
                            System.out.println(schedule);
                            result.add(schedule);
                            scheduleRepo.save(schedule);
                        }
                    }else{
                        System.out.println("lít < 0");
                        result.add(schedule);
                        scheduleRepo.save(schedule);
                    }
                }
        );
        return result;
    }

    @Override
    public List<ScheduleDTO> getAll() {
        return dataMapperUtils.mapAll(scheduleRepo.findAll(),ScheduleDTO.class);
    }

    public boolean checkContainsSchedule(List<ScheduleEntity> list, int timeId){
        AtomicBoolean result = new AtomicBoolean(false);
        list.forEach(schedule -> {
            if(schedule.getTimeId()==timeId){
                result.set(true);
            }
        });
        return result.get();
    }

    public List<ScheduleDTO> getScheduleByDate(int doctorId, Date date){
        return dataMapperUtils.mapAll(scheduleRepo.findAllByDateAndDoctorId(date,doctorId),ScheduleDTO.class);
    }

    @Override
    public boolean isExists(int doctorId, Date date, int timeId) {
        return false;
    }

}
