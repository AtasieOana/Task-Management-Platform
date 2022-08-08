package com.project.taskmanagement_backend.repository;

import com.project.taskmanagement_backend.model.User;
import com.project.taskmanagement_backend.model.UserWorkspace;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UserWorkspaceRepository extends JpaRepository<UserWorkspace, Integer> {

    @Query("SELECT userWorkspace from UserWorkspace as userWorkspace where userWorkspace.user.id = :userId and userWorkspace.workspace.id = :workspaceId")
    Optional<UserWorkspace> findByUserAndWorkspace(String workspaceId, String userId);

    @Query("SELECT userWorkspace from UserWorkspace as userWorkspace where userWorkspace.user.email = :userEmail")
    List<UserWorkspace> findByUserEmail(String userEmail);

    Optional<UserWorkspace> findById(String id);

    @Query("SELECT userWorkspace from UserWorkspace as userWorkspace where userWorkspace.workspace.id = :workspaceId")
    List<UserWorkspace> findByWorkspace(String workspaceId);
}
