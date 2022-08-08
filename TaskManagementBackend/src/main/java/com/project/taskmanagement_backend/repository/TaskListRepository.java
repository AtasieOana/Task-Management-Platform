package com.project.taskmanagement_backend.repository;

import com.project.taskmanagement_backend.model.Board;
import com.project.taskmanagement_backend.model.TaskList;
import com.project.taskmanagement_backend.model.UserBoard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TaskListRepository extends JpaRepository<TaskList, Integer> {

    @Query("SELECT taskList from TaskList as taskList where taskList.board.id = :idBoard order by taskList.createDate")
    List<TaskList> findByBoardId(String idBoard);

    @Query("SELECT taskList from TaskList as taskList where taskList.id = :id")
    Optional<TaskList> findById(String id);

}