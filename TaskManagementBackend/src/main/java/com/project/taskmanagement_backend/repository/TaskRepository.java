package com.project.taskmanagement_backend.repository;

import com.project.taskmanagement_backend.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

public interface TaskRepository extends JpaRepository<Task, Integer> {

    @Query("SELECT task from Task as task where task.taskList.id = :idTaskList order by task.orderInList")
    List<Task> findByTaskListId(String idTaskList);

    @Query("SELECT task from Task as task where task.taskList.board.id = :boardId and task.startDate IS NOT NULL order by task.startDate,task.title")
    List<Task> findByBoardIdOrderByStartDate(String boardId);

    @Query("SELECT task from Task as task where task.taskList.board.id = :boardId and task.startDate IS NULL order by task.title")
    List<Task> findByBoardIdWithoutStartDate(String boardId);

    @Query("SELECT task from Task as task where task.taskList.board.id = :boardId and task.endDate IS NULL order by task.title")
    List<Task> findByBoardIdWithoutEndDate(String boardId);

    @Query("SELECT task from Task as task where task.taskList.board.id = :boardId and task.endDate IS NOT NULL order by task.endDate,task.title ")
    List<Task> findByBoardIdOrderByEndDate(String boardId);

    @Query("SELECT task from Task as task where task.id = :id")
    Optional<Task> findById(String id);

    @Transactional
    @Modifying
    @Query("UPDATE Task task SET task.orderInList  = task.orderInList + 1 WHERE task.orderInList  >= :newPosition AND task.orderInList  < :oldPosition AND task.id <> :taskId AND task.taskList.id = :taskListId")
    void incrementBelowToPosition(int newPosition, int oldPosition, String taskId, String taskListId);

    @Transactional
    @Modifying
    @Query("UPDATE Task task SET task.orderInList  = task.orderInList - 1 WHERE task.orderInList <= :newPosition AND task.orderInList > :oldPosition AND task.id <> :taskId AND task.taskList.id = :taskListId")
    void decrementAboveToPosition(int newPosition, int oldPosition, String taskId, String taskListId);
}
