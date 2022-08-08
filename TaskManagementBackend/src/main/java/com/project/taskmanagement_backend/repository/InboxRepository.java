package com.project.taskmanagement_backend.repository;

import com.project.taskmanagement_backend.model.Inbox;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface InboxRepository extends JpaRepository<Inbox, Integer> {

    Optional<Inbox> findById(String id);

    @Query("SELECT inbox from Inbox as inbox where inbox.user.email = :userEmail order by inbox.sendDate")
    List<Inbox> findByUserEmail(String userEmail);

    @Query("SELECT inbox from Inbox as inbox where inbox.user.email = :userEmail and inbox.seen = false")
    List<Inbox> findNotReadMessages(String userEmail);
}
