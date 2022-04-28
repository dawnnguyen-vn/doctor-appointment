package com.example.doctorappointment.DTO.schedule;

import com.example.doctorappointment.entity.DoctorEntity;
import com.example.doctorappointment.entity.DoctorTimeEntity;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
public class ScheduleWriteDTO {

    private int date;
    private List<Integer> doctorTimes = new ArrayList<>();
    private int doctorId;


}
