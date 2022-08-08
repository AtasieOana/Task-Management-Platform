package com.project.taskmanagement_backend.repository;

import com.project.taskmanagement_backend.model.UserMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UserMessageRepository extends JpaRepository<UserMessage, Integer> {

    @Query("SELECT userMessage from UserMessage as userMessage where userMessage.chatMessage.board.id = :idBoard and userMessage.user.email = :email and userMessage.seen = :seen")
    List<UserMessage> findMessagesByBoardIdAndUserEmailWithSeen(String idBoard, String email, Boolean seen);

    @Query("SELECT userMessage from UserMessage as userMessage where userMessage.chatMessage.board.id = :idBoard and userMessage.user.email = :email order by  userMessage.chatMessage.sendDate")
    List<UserMessage> findMessagesByBoardIdAndUserEmail(String idBoard, String email);

    @Query("SELECT userMessage from UserMessage as userMessage where userMessage.chatMessage.board.id = :idBoard and userMessage.user.id = :idUser and userMessage.seen = :seen")
    List<UserMessage> findMessagesNotSeen(String idBoard, String idUser, Boolean seen);


}
