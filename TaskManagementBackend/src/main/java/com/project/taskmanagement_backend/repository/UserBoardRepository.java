package com.project.taskmanagement_backend.repository;

import com.project.taskmanagement_backend.model.UserBoard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserBoardRepository extends JpaRepository<UserBoard, Integer> {

    @Query("SELECT userBoard from UserBoard as userBoard where userBoard.user.email = :userEmail and userBoard.userType <> 'viewer'")
    List<UserBoard> findByUserEmail(String userEmail);

    Optional<UserBoard> findById(Long id);

    @Query("SELECT userBoard from UserBoard as userBoard where userBoard.board.id = :boardId and userBoard.userType <> 'viewer'")
    List<UserBoard> findByBoardId(Long boardId);

    @Query("SELECT userBoard from UserBoard as userBoard where userBoard.user.id = :userId and userBoard.board.id = :boardId")
    Optional<UserBoard> findByUserAndBoardId(Long userId, Long boardId);

    @Query("SELECT userBoard from UserBoard as userBoard where userBoard.board.privacy = :privacy and userBoard.user.id <> :userId group by userBoard.board")
    List<UserBoard> findByPrivacy(Boolean privacy, Long userId);

}
