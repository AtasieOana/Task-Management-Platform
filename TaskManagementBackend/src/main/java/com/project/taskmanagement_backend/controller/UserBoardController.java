package com.project.taskmanagement_backend.controller;

import com.project.taskmanagement_backend.model.Board;
import com.project.taskmanagement_backend.model.User;
import com.project.taskmanagement_backend.model.UserBoard;
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

    @GetMapping("/getBoardsOfUser/{email}")
    public List<UserBoard> getAllBoardsOfUser(@PathVariable String email){
        return userBoardService.getAllBoardsOfUser(email);
    }

    @PostMapping("/createBoard")
    public UserBoard createBoard(@Valid @RequestBody UserBoard userBoard) {
        return userBoardService.saveBoardInDatabase(userBoard);
    }

    @GetMapping("getUserBoard/{id}")
    public UserBoard getUserBoard(@PathVariable int id) {
        return userBoardService.getUserBoard((long) id);
    }

    @GetMapping("/getUsersInBoard/{id}")
    public List<User> getUsersInBoard(@PathVariable Long id){
        return userBoardService.getUsersByBoardId(id);
    }

    @GetMapping("/checkExistenceUserInBoard/{userId}/{boardId}")
    public UserBoard checkExistenceUserInBoard(@PathVariable Long userId, @PathVariable Long boardId) {
        return userBoardService.checkExistenceUserInBoard(boardId, userId);
    }

    @PutMapping("/updateUserRole")
    public UserBoard updateName(@Valid @RequestBody UserBoard userBoard) {
        return userBoardService.updateUserRole(userBoard.getId(), userBoard.getUserType());
    }

    @DeleteMapping("deleteUserBoard/{id}")
    public void deleteBoard(@PathVariable(name = "id") Long id) {
        userBoardService.deleteUserBoard(id);
    }

    @GetMapping("/checkIfUserExistAndIsInBoard/{email}/{boardId}")
    public User checkIfUserExistAndIsInBoard(@PathVariable String email, @PathVariable Long boardId) {
        return userBoardService.checkIfUserExistAndIsInBoard(email, boardId);
    }

    @PostMapping("/saveUserBoardIfNotExists")
    public UserBoard saveUserBoardIfNotExists(@Valid @RequestBody UserBoard userBoard) {
        return userBoardService.saveUserBoardIfNotExists(userBoard);
    }

    @GetMapping("/getPublicBoards/{userId}")
    public List<Board> getPublicBoards(@PathVariable Long userId){
        return userBoardService.getPublicBoards(userId);
    }

}
