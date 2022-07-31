package com.example.doctorappointment.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "clinic_markdown")
public class ClinicMarkdownEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Lob
    @Column
    private String GioiThieu;

    @Lob
    @Column
    private String TheManh;

    @Lob
    @Column
    private String TrangThietBi;

    @Lob
    @Column
    private String QuyTrinhKham;

    @Column
    private int clinicId;
}
