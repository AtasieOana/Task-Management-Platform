package com.project.taskmanagement_backend.repository;

import com.project.taskmanagement_backend.model.AuthenticationToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface AuthenticationTokenRepository extends JpaRepository<AuthenticationToken, Integer> {

    @Query("SELECT token from AuthenticationToken as token where token.user.email = :email")
    Optional<AuthenticationToken> findByUserEmail(String email);

}
