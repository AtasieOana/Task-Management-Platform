package com.project.taskmanagement_backend.service;

import com.project.taskmanagement_backend.model.Inbox;
import com.project.taskmanagement_backend.repository.InboxRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class InboxService {

    private final InboxRepository inboxRepository;
    private final EmailService emailService;

    @Autowired
    public InboxService(InboxRepository inboxRepository, EmailService emailService) {
        this.inboxRepository = inboxRepository;
        this.emailService = emailService;
    }

    public List<Inbox> getInboxOfUser(String email) {
        return new ArrayList<>(inboxRepository.findByUserEmail(email));
    }

    public Inbox markAsReadMessage(String id){
        Optional<Inbox> inboxOptional = inboxRepository.findById(id);
        Inbox inbox = inboxOptional.orElse(null);
        if (inbox != null) {
            inbox.setSeen(true);
            return inboxRepository.save(inbox);
        }
        return null;
    }

    public Inbox saveMessageInDatabase(Inbox inbox) {
        emailService.sendEmailToUserAsync(inbox.getUser().getEmail(), "Hello, \n \n " + inbox.getMessage() + "  \n \n Have a great day, \n TASKO Team", "TASKO notification");
        return inboxRepository.save(inbox);
    }

    public int findNotReadMessagesNumber(String email) {
        List<Inbox> inboxList = inboxRepository.findNotReadMessages(email);
        return inboxList.size();
    }



}
