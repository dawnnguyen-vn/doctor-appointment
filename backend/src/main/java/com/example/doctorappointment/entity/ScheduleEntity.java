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
@Table(name = "schedule")
public class ScheduleEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    private int date;

    @ManyToMany
    @JoinTable(
            name = "schedule_time",
            joinColumns = @JoinColumn(name = "schedule_id"),
            inverseJoinColumns = @JoinColumn(name = "doctor_time_id"))
    private List<DoctorTimeEntity> doctorTimes = new ArrayList<>();

    @JsonIgnore
    @ManyToOne(
            fetch = FetchType.EAGER,
            cascade = CascadeType.ALL)
    @JoinColumn(name = "doctor_id", nullable = false)
    private DoctorEntity doctor;


}
