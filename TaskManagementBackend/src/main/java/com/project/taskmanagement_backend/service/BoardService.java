package com.project.taskmanagement_backend.service;

import com.project.taskmanagement_backend.model.Board;
import com.project.taskmanagement_backend.repository.BoardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class BoardService {
    private final BoardRepository boardRepository;

    @Autowired
    public BoardService(BoardRepository boardRepository) {
        this.boardRepository = boardRepository;
    }

    public List<Board> getAllBoards() {
        return new ArrayList<>(boardRepository.findAll());
    }

    public Board getBoard(String id) {
        Optional<Board> optionalBoard = boardRepository.findById(id);
        return optionalBoard.orElse(null);
    }

    public Board updateBoardPrivacy(String id,Boolean privacy) {
        Optional<Board> optionalBoard = boardRepository.findById(id);
        Board board = optionalBoard.orElse(null);
        if (board != null) {
            board.setPrivacy(privacy);
            return boardRepository.save(board);
        }
        return null;
    }

    public Board updateBoardName(String id,String name) {
        Optional<Board> optionalBoard = boardRepository.findById(id);
        Board board = optionalBoard.orElse(null);
        if (board != null) {
            board.setName(name);
            return boardRepository.save(board);
        }
        return null;
    }

    public void deleteBoard(String id) {
        Optional<Board> boardOptional = boardRepository.findById(id);
        if (boardOptional.isPresent()) {
            boardRepository.delete(boardOptional.get());
        } else {
            throw new NoSuchElementException(String.valueOf(boardOptional));
        }
    }



}
