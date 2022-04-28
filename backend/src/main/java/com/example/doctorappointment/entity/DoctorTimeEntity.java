package com.example.doctorappointment.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "doctor_time")
public class DoctorTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    private String time;

    @ManyToMany(mappedBy = "doctorTimes")
    @JsonIgnore
    private List<ScheduleEntity> schedules = new ArrayList<>();
}
