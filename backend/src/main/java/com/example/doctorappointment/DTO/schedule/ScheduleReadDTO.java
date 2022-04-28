package com.example.doctorappointment.DTO.schedule;

import com.example.doctorappointment.entity.DoctorTimeEntity;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
public class ScheduleReadDTO {

    private int id;
    private int date;
    private List<DoctorTimeEntity> doctorTimes = new ArrayList<>();
    private int doctorId;


}
