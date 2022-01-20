package com.project.taskmanagement_backend.controller;

import com.project.taskmanagement_backend.model.Inbox;
import com.project.taskmanagement_backend.service.InboxService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping(value = "/inbox")
public class InboxController {

    private final InboxService inboxService;

    @Autowired
    public InboxController(InboxService inboxService) {
        this.inboxService = inboxService;
    }

    @PostMapping("/markAsRead")
    public Inbox readMessageInInbox(@Valid @RequestBody Inbox inbox) {
        return inboxService.markAsReadMessage(inbox.getId());
    }

    @GetMapping("/getInboxForUser/{email}")
    public List<Inbox> getInboxForUser(@PathVariable String email){
        return inboxService.getInboxOfUser(email);
    }

    @PostMapping("/createInbox")
    public Inbox createInbox(@Valid @RequestBody Inbox inbox) {
        return inboxService.saveMessageInDatabase(inbox);
    }

    @GetMapping("/findNotReadMessagesNumber/{email}")
    public int findNotReadMessagesNumber(@PathVariable String email){
        return inboxService.findNotReadMessagesNumber(email);
    }


}
