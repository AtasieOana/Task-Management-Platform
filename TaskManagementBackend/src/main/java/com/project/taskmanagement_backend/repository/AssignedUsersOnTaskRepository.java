package com.project.taskmanagement_backend.repository;

import com.project.taskmanagement_backend.model.AssignedUsersOnTask;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.sql.Date;
import java.util.List;
import java.util.Optional;

public interface AssignedUsersOnTaskRepository extends JpaRepository<AssignedUsersOnTask, Integer> {

    Optional<AssignedUsersOnTask> findById(String id);

    @Query("SELECT asgn from AssignedUsersOnTask as asgn where asgn.task.id = :idTask")
    List<AssignedUsersOnTask> findByTaskId(String idTask);

    @Query("SELECT asgn from AssignedUsersOnTask as asgn where asgn.task.id = :idTask and asgn.user.id = :idUser")
    Optional<AssignedUsersOnTask> findByTaskAndUserId(String idTask, String idUser);

    @Query("SELECT asgn from AssignedUsersOnTask as asgn where asgn.user.id = :idUser")
    List<AssignedUsersOnTask> findByUserId(String idUser);

    @Query("SELECT asgn from AssignedUsersOnTask as asgn where asgn.task.taskList.board.id = :boardId and asgn.user.id = :userId")
    List<AssignedUsersOnTask> findByBoardAndUserId(String boardId, String userId);
}