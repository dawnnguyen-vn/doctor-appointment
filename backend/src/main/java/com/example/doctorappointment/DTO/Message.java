package com.example.doctorappointment.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Date;

@Data @AllArgsConstructor
public class Message {
    private Date timestamp;
    private String status;
    private String message;
    private Object data;
}
