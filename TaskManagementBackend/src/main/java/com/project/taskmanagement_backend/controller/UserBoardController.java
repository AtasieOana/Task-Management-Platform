package com.project.taskmanagement_backend.controller;

import com.project.taskmanagement_backend.model.Board;
import com.project.taskmanagement_backend.model.User;
import com.project.taskmanagement_backend.model.UserBoard;
import com.project.taskmanagement_backend.model.UserWorkspace;
import com.project.taskmanagement_backend.service.UserBoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping(value = "/user/board")
public class UserBoardController {
    private final UserBoardService userBoardService;

    @Autowired
    public UserBoardController(UserBoardService userBoardService) {
        this.userBoardService = userBoardService;
    }

    @GetMapping("/getAllBoardsOfUserWithoutWorkspace/{email}")
    public List<UserBoard> getAllBoardsOfUserWithoutWorkspace(@PathVariable String email){
        return userBoardService.getAllBoardsOfUserWithoutWorkspace(email);
    }

    @GetMapping("/getAllBoardsOfUserFromWorkspace/{email}/{workspaceId}")
    public List<UserBoard> getAllBoardsOfUserFromWorkspace(@PathVariable String email, @PathVariable String workspaceId){
        return userBoardService.getAllBoardsOfUserFromWorkspace(email,workspaceId);
    }

    @GetMapping("/getUserWorkspaceForCurrentUserAndWorkspace/{userId}/{workspaceId}")
    public UserWorkspace getUserWorkspaceForCurrentUserAndWorkspace(@PathVariable String userId, @PathVariable String workspaceId){
        return userBoardService.getUserWorkspaceForCurrentUserAndWorkspace(userId,workspaceId);
    }

    @PostMapping("/createBoard")
    public UserBoard createBoard(@Valid @RequestBody UserBoard userBoard) {
        return userBoardService.saveBoardInDatabase(userBoard);
    }

    @GetMapping("/getUserBoard/{id}")
    public UserBoard getUserBoard(@PathVariable String id) {
        return userBoardService.getUserBoard(id);
    }


    @GetMapping("/getOrCreateUserBoard/{userId}/{boardId}")
    public UserBoard getOrCreateUserBoard(@PathVariable String userId, @PathVariable String boardId) {
        return userBoardService.getOrCreateUserBoard(userId, boardId);
    }

    @GetMapping("/getUsersInBoard/{id}")
    public List<User> getUsersInBoard(@PathVariable String id){
        return userBoardService.getUsersByBoardId(id);
    }

    @GetMapping("/checkExistenceUserInBoard/{userId}/{boardId}")
    public UserBoard checkExistenceUserInBoard(@PathVariable String userId, @PathVariable String boardId) {
        return userBoardService.checkExistenceUserInBoard(boardId, userId);
    }

    @PutMapping("/updateUserRole")
    public UserBoard updateName(@Valid @RequestBody UserBoard userBoard) {
        return userBoardService.updateUserRole(userBoard.getId(), userBoard.getUserType());
    }

    @DeleteMapping("deleteUserBoard/{id}")
    public void deleteBoard(@PathVariable(name = "id") String id) {
        userBoardService.deleteUserBoard(id);
    }

    @GetMapping("/checkIfUserExistAndIsInBoard/{email}/{boardId}")
    public User checkIfUserExistAndIsInBoard(@PathVariable String email, @PathVariable String boardId) {
        return userBoardService.checkIfUserExistAndIsInBoard(email, boardId);
    }

    @PostMapping("/saveUserBoardIfNotExists")
    public UserBoard saveUserBoardIfNotExists(@Valid @RequestBody UserBoard userBoard) {
        return userBoardService.saveUserBoardIfNotExists(userBoard);
    }

}
