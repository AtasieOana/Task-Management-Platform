package com.project.taskmanagement_backend.repository;

import com.project.taskmanagement_backend.model.UserBoard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserBoardRepository extends JpaRepository<UserBoard, Integer> {

    @Query("SELECT userBoard from UserBoard as userBoard where userBoard.user.email = :userEmail and userBoard.userType <> 'viewer' and userBoard.board.workspace is null order   by  userBoard.board.createDate desc")
    List<UserBoard> findByUserEmail(String userEmail);

    @Query("SELECT userBoard from UserBoard as userBoard where (userBoard.user.email = :userEmail and userBoard.userType <> 'viewer' and userBoard.board.workspace.id = :workspaceId) or (userBoard.board.workspace = :workspaceId and userBoard.board.privacy <> true) group by userBoard.board order  by  userBoard.board.createDate")
    List<UserBoard> findByUserEmailAndWorkspaceId(String userEmail, String workspaceId);

    Optional<UserBoard> findById(String id);

    @Query("SELECT userBoard from UserBoard as userBoard where userBoard.board.id = :boardId and userBoard.userType <> 'viewer'")
    List<UserBoard> findByBoardId(String boardId);

    @Query("SELECT userBoard from UserBoard as userBoard where userBoard.user.id = :userId and userBoard.board.id = :boardId")
    Optional<UserBoard> findByUserAndBoardId(String userId, String boardId);

    @Query("SELECT userBoard from UserBoard as userBoard where userBoard.user.id = :userId and userBoard.board.id = :boardId and userBoard.userType <> 'viewer'")
    Optional<UserBoard> findByUserAndBoardIdNotViewer(String userId, String boardId);

    @Query("SELECT userBoard from UserBoard as userBoard where userBoard.board.privacy = :privacy and userBoard.user.id <> :userId and userBoard.userType <> 'viewer' and userBoard.board.workspace is null group by userBoard.board")
    List<UserBoard> findByPrivacy(Boolean privacy, String userId);

    @Query("SELECT userBoard from UserBoard as userBoard where userBoard.board.workspace.id = :workspaceId and (userBoard.user.id = :userId or userBoard.board.privacy <> true) order  by  userBoard.board.createDate ")
    List<UserBoard> findByWorkspaceAndUser(String workspaceId, String userId);

}
