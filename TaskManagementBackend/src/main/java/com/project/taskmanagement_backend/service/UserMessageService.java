package com.project.taskmanagement_backend.service;

import com.project.taskmanagement_backend.model.*;
import com.project.taskmanagement_backend.repository.UserMessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class UserMessageService {

    private final UserMessageRepository userMessageRepository;
    private final UserBoardService userBoardService;

    @Autowired
    public UserMessageService(UserMessageRepository userMessageRepository, UserBoardService userBoardService) {
        this.userMessageRepository = userMessageRepository;
        this.userBoardService = userBoardService;
    }

    public List<UserMessage> getMessagesOfBoardSeenByUser(String idBoard, String email) {
        List<UserMessage> userMessageList = userMessageRepository.findMessagesByBoardIdAndUserEmailWithSeen(idBoard, email, true);
        Collections.sort(userMessageList);
        return userMessageList;
    }

    public List<UserMessage> getMessagesOfBoardNotSeenByUser(String idBoard, String email) {
        List<UserMessage> userMessageList = userMessageRepository.findMessagesByBoardIdAndUserEmailWithSeen(idBoard, email, false);
        userMessageList.sort(Collections.reverseOrder());
        return userMessageList;
    }

    public  List<UserMessage> getMessagesOfBoardAndUser(String idBoard, String email) {
        return userMessageRepository.findMessagesByBoardIdAndUserEmail(idBoard, email);
    }

    public void createUserMessageEntryForEveryUser(ChatMessage chatMessage){
        List<User> users = userBoardService.getUsersByBoardId(chatMessage.getBoard().getId());
        for(User user: users){
            UserMessage userMessage = new UserMessage();
            userMessage.setUser(user);
            userMessage.setChatMessage(chatMessage);
            userMessage.setSeen(Objects.equals(user.getEmail(), chatMessage.getSender().getEmail()));
            userMessageRepository.save(userMessage);
        }
    }

    public List<UserMessage> markReadAllMessages(String idBoard, String email){
        List<UserMessage> userMessageList = getMessagesOfBoardNotSeenByUser(idBoard, email);
        List<UserMessage> newUserMessageList = new ArrayList<>();
        for(UserMessage userMessage : userMessageList){
            userMessage.setSeen(true);
            newUserMessageList.add(userMessage);
            userMessageRepository.save(userMessage);
        }
        return newUserMessageList;
    }

    public int findNotReadChatMessagesNumber(String idBoard, String idUser) {
        List<UserMessage> userMessageList = userMessageRepository.findMessagesNotSeen(idBoard, idUser,false);
        return userMessageList.size();
    }



}
