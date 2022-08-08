package com.project.taskmanagement_backend.repository;

import com.project.taskmanagement_backend.model.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;


public interface ChatMessageRepository extends JpaRepository<ChatMessage, Integer> {

}
