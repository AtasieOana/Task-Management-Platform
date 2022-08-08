package com.project.taskmanagement_backend.repository;

import com.project.taskmanagement_backend.model.Workspace;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface WorkspaceRepository extends JpaRepository<Workspace, Integer> {

    Optional<Workspace> findById(String id);

}
