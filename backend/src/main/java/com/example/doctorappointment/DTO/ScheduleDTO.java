package com.example.doctorappointment.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ScheduleDTO {
    int id;
    int doctorId;
    int timeId;
    Date date;
    String name;
}
