package com.project.taskmanagement_backend.service;

import com.project.taskmanagement_backend.model.Board;
import com.project.taskmanagement_backend.model.User;
import com.project.taskmanagement_backend.model.UserBoard;
import com.project.taskmanagement_backend.repository.UserBoardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class UserBoardService {
    private final UserBoardRepository userBoardRepository;
    private final UserService userService;


    @Autowired
    public UserBoardService(UserBoardRepository userBoardRepository, UserService userService) {
        this.userService = userService;
        this.userBoardRepository = userBoardRepository;
    }

    public List<UserBoard> getAllBoardsOfUser(String email) {
        return new ArrayList<>(userBoardRepository.findByUserEmail(email));
    }

    public UserBoard saveBoardInDatabase(UserBoard connection) {
        return userBoardRepository.save(connection);
    }

    public UserBoard getUserBoard(Long id) {
        Optional<UserBoard> optionalUserBoard = userBoardRepository.findById(id);
        return optionalUserBoard.orElse(null);
    }

    public List<User> getUsersByBoardId(Long boardId) {
        List<UserBoard> userBoards = userBoardRepository.findByBoardId(boardId);
        List<User> users = new ArrayList<>();
        for(UserBoard userBoard:userBoards)
            users.add(userBoard.getUser());
        return users;
    }

    public List<Board> getPublicBoards(Long userId) {
        List<UserBoard> userBoards = userBoardRepository.findByPrivacy(false, userId);
        List<Board> boards = new ArrayList<>();
        for(UserBoard userBoard:userBoards)
            boards.add(userBoard.getBoard());
        return boards;
    }

    public UserBoard checkExistenceUserInBoard(Long boardId, Long userId) {
        Optional<UserBoard> optionalUserBoard = userBoardRepository.findByUserAndBoardId(userId, boardId);
        return optionalUserBoard.orElse(null);
    }

    public UserBoard updateUserRole(Long id,String role) {
        Optional<UserBoard> optionalUserBoard = userBoardRepository.findById(id);
        UserBoard userBoard = optionalUserBoard.orElse(null);
        if (userBoard != null) {
            userBoard.setUserType(role);
            return userBoardRepository.save(userBoard);
        }
        return null;
    }

    public void deleteUserBoard(Long id) {
        Optional<UserBoard> userBoardOptional = userBoardRepository.findById(id);
        if (userBoardOptional.isPresent()) {
            userBoardRepository.delete(userBoardOptional.get());
        } else {
            throw new NoSuchElementException(String.valueOf(userBoardOptional));
        }
    }

    public User checkIfUserExistAndIsInBoard(String email, Long boardId) {
        User user = userService.getUser(email);
        if (user == null) {
            return null;
        } else {
            Optional<UserBoard> optionalUserBoard = userBoardRepository.findByUserAndBoardId(user.getId(), boardId);
            if (optionalUserBoard.isPresent()) {
                return null;
            } else {
                return user;
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
}
