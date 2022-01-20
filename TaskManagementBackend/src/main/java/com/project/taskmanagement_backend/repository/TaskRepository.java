package com.project.taskmanagement_backend.repository;

import com.project.taskmanagement_backend.model.Task;
import com.project.taskmanagement_backend.model.TaskList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface TaskRepository extends JpaRepository<Task, Integer> {

    @Query("SELECT task from Task as task where task.taskList.id = :idTaskList")
    List<Task> findByTaskListId(Long idTaskList);

    @Query("SELECT task from Task as task where task.id = :id")
    Optional<Task> findById(Long id);
}
