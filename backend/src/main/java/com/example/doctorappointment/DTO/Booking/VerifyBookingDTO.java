package com.example.doctorappointment.DTO.Booking;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VerifyBookingDTO {
    String email;
    String fileName;
    String imageContent;
    int bookingId;
}
