package com.project.taskmanagement_backend.service;

import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Properties;


@Service
public class EmailService {

    private Session mailSession;

    @PostConstruct()
    private void makeSession(){
        Properties properties = System.getProperties();
        properties.setProperty("mail.smtp.host", "smtp.gmail.com");
        properties.put("mail.smtp.auth", "true");
        properties.put("mail.port", 587);
        properties.put("mail.smtp.starttls.enable", "true");


        mailSession = Session.getInstance(properties,
                new javax.mail.Authenticator() {
                    protected PasswordAuthentication getPasswordAuthentication() {
                        return new PasswordAuthentication(
                                "tasko.platform@gmail.com", "fkqbeczaqautchff");
                    }
                });
    }


    @Async
    public void sendEmailToUserAsync(String emailReceiver, String emailContent, String emailSubject) {
        try{
            MimeMessage messageFormed = new MimeMessage(mailSession);
            messageFormed.setFrom(new InternetAddress("tasko.platform@gmail.com"));
            messageFormed.addRecipient(Message.RecipientType.TO,new InternetAddress(emailReceiver));
            messageFormed.setSubject(emailSubject);
            messageFormed.setText(emailContent);

            System.out.println("Mail prepared!");
            Transport.send(messageFormed);
            System.out.println("Mail send successfully!");
        } catch (MessagingException ex)
        {
            ex.printStackTrace();
        }
    }
}
