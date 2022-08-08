package com.project.taskmanagement_backend.controller;

import com.project.taskmanagement_backend.model.ChatMessage;
import com.project.taskmanagement_backend.model.Inbox;
import com.project.taskmanagement_backend.service.ChatMessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping(value = "/chat")
public class ChatMessageController {

    private final ChatMessageService chatMessageService;

    @Autowired
    public ChatMessageController(ChatMessageService chatMessageService) {
        this.chatMessageService = chatMessageService;
    }

    @PostMapping("/sendMessage")
    public ChatMessage sendMessage(@Valid @RequestBody ChatMessage chatMessage) {
        return chatMessageService.saveChatMessageInDatabase(chatMessage);
    }


}
