package com.project.taskmanagement_backend.service;

import com.project.taskmanagement_backend.model.ChatMessage;
import com.project.taskmanagement_backend.repository.ChatMessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ChatMessageService {

    private final ChatMessageRepository chatMessageRepository;
    private final UserMessageService userMessageService;

    @Autowired
    public ChatMessageService(ChatMessageRepository chatMessageRepository, UserMessageService userMessageService) {
        this.chatMessageRepository = chatMessageRepository;
        this.userMessageService = userMessageService;
    }

    public ChatMessage saveChatMessageInDatabase(ChatMessage message) {
        ChatMessage chatMessage = chatMessageRepository.save(message);
        userMessageService.createUserMessageEntryForEveryUser(chatMessage);
        return chatMessage;
    }



}
