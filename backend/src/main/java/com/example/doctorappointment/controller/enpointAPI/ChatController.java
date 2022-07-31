package com.example.doctorappointment.controller.enpointAPI;

import com.example.doctorappointment.entity.MessageEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.Message;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class ChatController {

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;


    @MessageMapping("/message")
    @SendTo("/chatroom/public")
    private MessageEntity receivePublicMessage(@Payload MessageEntity message){
        return message;
    }
    @MessageMapping("/private-message")
    private MessageEntity receivePrivateMessage(@Payload MessageEntity message){

        simpMessagingTemplate.convertAndSendToUser(message.getSenderName(),"/private",message);

        return message;
    }


}
