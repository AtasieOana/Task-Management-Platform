package com.project.taskmanagement_backend.repository;

import com.project.taskmanagement_backend.model.AssignedUsersOnTask;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface AssignedUsersOnTaskRepository extends JpaRepository<AssignedUsersOnTask, Integer> {

    Optional<AssignedUsersOnTask> findById(Long id);

    @Query("SELECT asgn from AssignedUsersOnTask as asgn where asgn.task.id = :idTask")
    List<AssignedUsersOnTask> findByTaskId(Long idTask);

    @Query("SELECT asgn from AssignedUsersOnTask as asgn where asgn.task.id = :idTask and asgn.user.id = :idUser")
    Optional<AssignedUsersOnTask> findByTaskAndUserId(Long idTask, Long idUser);
}
