package com.project.taskmanagement_backend.service;

import com.project.taskmanagement_backend.model.*;
import com.project.taskmanagement_backend.repository.UserBoardRepository;
import com.project.taskmanagement_backend.repository.UserWorkspaceRepository;
import com.project.taskmanagement_backend.repository.WorkspaceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalDate;
import java.util.*;

@Service
public class UserBoardService {
    private final UserBoardRepository userBoardRepository;
    private final UserService userService;
    private final WorkspaceRepository workspaceRepository;
    private final UserWorkspaceRepository userWorkspaceRepository;
    private final BoardService boardService;


    @Autowired
    public UserBoardService(UserBoardRepository userBoardRepository, UserService userService,
                            WorkspaceRepository workspaceRepository, UserWorkspaceRepository userWorkspaceRepository,
                            BoardService boardService) {
        this.userService = userService;
        this.userBoardRepository = userBoardRepository;
        this.workspaceRepository = workspaceRepository;
        this.userWorkspaceRepository = userWorkspaceRepository;
        this.boardService = boardService;
    }

    public List<UserBoard> getAllBoardsOfUserWithoutWorkspace(String email) {
        return new ArrayList<>(userBoardRepository.findByUserEmail(email));
    }

    public List<UserBoard> getAllBoardsOfUserFromWorkspace(String email, String workspaceId) {
        return userBoardRepository.findByUserEmailAndWorkspaceId(email,workspaceId);
    }


    public UserBoard saveBoardInDatabase(UserBoard connection) {
        if(connection.getBoard().getWorkspace() != null) {
            Optional<Workspace> workspace = workspaceRepository.findById(connection.getBoard().getWorkspace().getId());
            if (workspace.isPresent()) {
                connection.getBoard().setWorkspace(workspace.get());
            } else {
                connection.getBoard().setWorkspace(null);
            }
        }
        if(!Objects.equals(connection.getUserType(), "viewer")){
            Optional<UserBoard> optionalUserBoard = userBoardRepository.findByUserAndBoardId(connection.getUser().getId(), connection.getBoard().getId());
            optionalUserBoard.ifPresent(userBoard -> deleteUserBoard(userBoard.getId()));
        }
        return userBoardRepository.save(connection);
    }

    public UserWorkspace getUserWorkspaceForCurrentUserAndWorkspace(String userId, String workspaceId){
        Optional<UserWorkspace> userWorkspaceOptional = this.userWorkspaceRepository.findByUserAndWorkspace(workspaceId, userId);
        return userWorkspaceOptional.orElse(null);
    }

    public UserBoard getUserBoard(String id) {
        Optional<UserBoard> optionalUserBoard = userBoardRepository.findById(id);
        return optionalUserBoard.orElse(null);
    }

    public List<User> getUsersByBoardId(String boardId) {
        List<UserBoard> userBoards = userBoardRepository.findByBoardId(boardId);
        List<User> users = new ArrayList<>();
        for(UserBoard userBoard:userBoards)
            users.add(userBoard.getUser());
        return users;
    }

    public List<UserBoard> getPublicBoards(String userId) {
        return userBoardRepository.findByPrivacy(false, userId);
    }

    public UserBoard checkExistenceUserInBoard(String boardId, String userId) {
        Optional<UserBoard> optionalUserBoard = userBoardRepository.findByUserAndBoardId(userId, boardId);
        return optionalUserBoard.orElse(null);
    }

    public UserBoard updateUserRole(String id,String role) {
        Optional<UserBoard> optionalUserBoard = userBoardRepository.findById(id);
        UserBoard userBoard = optionalUserBoard.orElse(null);
        if (userBoard != null) {
            userBoard.setUserType(role);
            return userBoardRepository.save(userBoard);
        }
        return null;
    }

    public void deleteUserBoard(String id) {
        Optional<UserBoard> userBoardOptional = userBoardRepository.findById(id);
        if (userBoardOptional.isPresent()) {
            userBoardRepository.delete(userBoardOptional.get());
        } else {
            throw new NoSuchElementException(String.valueOf(userBoardOptional));
        }
    }

    public User checkIfUserExistAndIsInBoard(String email, String boardId) {
        User user = userService.getUser(email);
        if (user == null) {
            return null;
        } else {
            Optional<UserBoard> optionalUserBoard = userBoardRepository.findByUserAndBoardIdNotViewer(user.getId(), boardId);
            if (optionalUserBoard.isPresent()) {
                return null;
            } else {
                return user;
            }
        }
    }

    public UserBoard getOrCreateUserBoard(String userId, String boardId) {
        User user = userService.getUserById(userId);
        if (user == null) {
            return null;
        } else {
            Optional<UserBoard> optionalUserBoard = userBoardRepository.findByUserAndBoardId(user.getId(), boardId);
            if (optionalUserBoard.isPresent()) {
                return optionalUserBoard.get();
            } else {
                Board board = boardService.getBoard(boardId);
                UserBoard userBoard = new UserBoard();
                userBoard.setUser(user);
                userBoard.setBoard(board);
                userBoard.setUserAdditionDate(Date.valueOf(LocalDate.now()));
                userBoard.setUserType("simpleUser");
                return userBoardRepository.save(userBoard);
            }
        }
    }

    public UserBoard saveUserBoardIfNotExists(UserBoard connection) {
        Optional<UserBoard> userBoard = userBoardRepository.findByUserAndBoardId(connection.getUser().getId(),
                connection.getBoard().getId());
        if (userBoard.isPresent()) {
            return userBoard.orElse(null);
        } else {
            return saveBoardInDatabase(connection);
        }
    }

    public void deleteAllBoardsInWorkspaceForUser(String workspaceId, String userId){
        List<UserBoard> userBoards = userBoardRepository.findByWorkspaceAndUser(workspaceId, userId);
        userBoardRepository.deleteAll(userBoards);
    }
}
