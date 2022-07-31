package com.example.doctorappointment.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class MessageEntity {
    private String senderName;
    private String receiverName;
    private String message;
    private Date date;
    private String status;
}
