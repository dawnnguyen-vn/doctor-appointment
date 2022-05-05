package com.example.doctorappointment.service;

import javax.mail.MessagingException;
import java.io.UnsupportedEncodingException;

public interface EmailSenderService {
    void sendSimpleMessage( String to, String subject, String text);

    void sendEmailHTML(String to , String subject , String html) throws MessagingException;

    String getVerifyBooking(String patinentName,String time,String doctorName,String redirectLink);

    void sendEmailHTMLWithAttachment(String to , String subject , String html,String fileName,String fileContent) throws MessagingException, UnsupportedEncodingException;
}
