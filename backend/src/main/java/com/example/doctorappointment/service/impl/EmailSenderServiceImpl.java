package com.example.doctorappointment.service.impl;

import com.example.doctorappointment.service.EmailSenderService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.activation.DataHandler;
import javax.activation.DataSource;
import javax.mail.MessagingException;
import javax.mail.Multipart;
import javax.mail.internet.*;
import javax.mail.util.ByteArrayDataSource;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;

@Service
@RequiredArgsConstructor
public class EmailSenderServiceImpl implements EmailSenderService {
    @Autowired
    private JavaMailSender emailSender;

    @Override
    public void sendSimpleMessage(String to, String subject, String text) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(text);
        emailSender.send(message);
    }

    @Override
    public void sendEmailHTML(String to, String subject, String html) throws MessagingException {
        MimeMessage message = emailSender.createMimeMessage();
        message.setContent(html,"text/html; charset=utf-8");
        MimeMessageHelper helper = new MimeMessageHelper(message, false, "utf-8");

        helper.setTo(to);
        helper.setSubject(subject);

        this.emailSender.send(message);
        System.out.println("email send !");
    }

    @Override
    public String getVerifyBooking(String patinentName, String time, String doctorName, String redirectLink) {
        String html =
        "<h3>Xin chào "+patinentName+"</h3>"
                +"<p> Bạn nhận được email này vì đã đặt lịch khám bệnh online tại DoctorCare.dacn !</p>"
                +"<p> Thông tin đặt lịch khám bệnh:</p>"
                +"<div><b>Thời gian: "+time+"</b></div>"
                +"<div><b>Bác sĩ: "+doctorName+"</b></div>"
                +"<p> Nếu các thông tin trên là đúng sự thật, vui lòng click vào đường link bên dưới để" +
                " xác nhân và hoàn tất thủ tục đặt lịch khám bệnh</p>" +
                "<div><a href="+redirectLink+" target='_blank'>Click here!</a></div>" +
                "<div> Xin chân thành cảm ơn</div>"
        ;
        return html;
    }

    @Override
    public void sendEmailHTMLWithAttachment(String to, String subject, String html, String fileName, String fileContent) throws MessagingException, UnsupportedEncodingException {
        MimeMessage message = emailSender.createMimeMessage();
        Multipart multipart = new MimeMultipart();
        multipart.addBodyPart(addAttachment(fileName,fileContent));
        MimeBodyPart HTMLbodyPart = new MimeBodyPart();
        HTMLbodyPart.setContent(html,"text/html; charset=utf-8");
        multipart.addBodyPart(HTMLbodyPart);

        message.setContent(multipart);

        MimeMessageHelper helper = new MimeMessageHelper(message, false, "utf-8");

        helper.setTo(to);
        helper.setSubject(subject);

        this.emailSender.send(message);
        System.out.println("email send !");
    }


        private MimeBodyPart addAttachment(final String fileName, final String fileContent) throws MessagingException, UnsupportedEncodingException {
        if (fileName == null || fileContent == null) {
            return null;
        }
        System.out.println("addAttachment()");
            MimeBodyPart filePart = new MimeBodyPart();

            String data = fileContent;
            DataSource ds;  //Assuming fileContent was encoded as UTF-8.
            InputStream in = new ByteArrayInputStream(data.getBytes("UTF-8"));
            try {
                in = MimeUtility.decode(in, "base64");
                try {
                    ds =  new ByteArrayDataSource(in , "image/*");
                } finally {
                    in.close();
                }
            } catch (IOException ioe) {
                throw new MessagingException(fileName, ioe);
            }

            // "image/*"
            filePart.setDataHandler(new DataHandler(ds));
            filePart.setFileName(fileName);
        System.out.println("addAttachment success !");
        return filePart;
    }
}
