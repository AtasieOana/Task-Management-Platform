package com.project.taskmanagement_backend.repository;

import com.project.taskmanagement_backend.model.Board;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface BoardRepository extends JpaRepository<Board, Integer> {

    Optional<Board> findById(String id);


}
