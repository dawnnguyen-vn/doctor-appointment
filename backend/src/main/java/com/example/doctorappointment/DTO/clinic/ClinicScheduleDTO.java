package com.example.doctorappointment.DTO.clinic;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ClinicScheduleDTO {
    private int clinicId;
    private Date date;
}
