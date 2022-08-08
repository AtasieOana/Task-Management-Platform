package com.project.taskmanagement_backend.controller;

import com.project.taskmanagement_backend.model.Board;
import com.project.taskmanagement_backend.service.BoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping(value = "/board")
public class BoardController {
    private final BoardService boardService;

    @Autowired
    public BoardController(BoardService boardService) {
        this.boardService = boardService;
    }

    @GetMapping("/seeBoards")
    public List<Board> getAllBoards(){
        return boardService.getAllBoards();
    }


    @GetMapping("getBoard/{id}")
    public Board getBoard(@PathVariable String id) {
        return boardService.getBoard(id);
    }

    @PostMapping("/updatePrivacy")
    public Board updatePrivacy(@Valid @RequestBody Board board) {
        return boardService.updateBoardPrivacy(board.getId(), board.getPrivacy());
    }

    @PostMapping("/updateName")
    public Board updateName(@Valid @RequestBody Board board) {
        return boardService.updateBoardName(board.getId(), board.getName());
    }

    @DeleteMapping("deleteBoard/{id}")
    public void deleteBoard(@PathVariable(name = "id") String id) {
        boardService.deleteBoard(id);
    }

}
