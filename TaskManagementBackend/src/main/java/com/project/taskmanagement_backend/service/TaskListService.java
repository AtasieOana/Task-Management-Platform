package com.project.taskmanagement_backend.service;

import com.project.taskmanagement_backend.model.TaskList;
import com.project.taskmanagement_backend.model.User;
import com.project.taskmanagement_backend.repository.TaskListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class TaskListService {
    private final TaskListRepository taskListRepository;
    private final TaskService taskService;
    private final BoardService boardService;

    @Autowired
    public TaskListService(TaskListRepository taskListRepository, TaskService taskService, BoardService boardService) {
        this.taskListRepository = taskListRepository;
        this.taskService = taskService;
        this.boardService = boardService;
    }

    public TaskList saveTaskListInDatabase(TaskList taskList) {
        return taskListRepository.save(taskList);
    }

    public List<TaskList> getAllTaskListFromABoard(String idBoard) {
        return new ArrayList<>(taskListRepository.findByBoardId(idBoard));
    }

    public void deleteTaskList(String id) {
        Optional<TaskList> taskListOptional = taskListRepository.findById(id);

        if (taskListOptional.isPresent()) {
            taskListRepository.delete(taskListOptional.get());
        } else {
            throw new NoSuchElementException(String.valueOf(taskListOptional));
        }
    }

    public TaskList updateTaskList(String id, TaskList taskList) {
        Optional<TaskList> taskListOptional = taskListRepository.findById(id);
        if (taskListOptional.isPresent()) {
            taskList.setId(id);
            return taskListRepository.save(taskList);
        } else {
            throw new NoSuchElementException(String.valueOf(taskList));
        }
    }

    public void copyTaskListToAnotherBoard(String oldBoardId, String newBoardId, User user) {
        List<TaskList> taskListList = getAllTaskListFromABoard(oldBoardId);
        for (TaskList taskList : taskListList) {
            TaskList copy = copyTaskList(taskList);
            copy.setBoard(boardService.getBoard(newBoardId));
            copy.setUser(user);
            TaskList newTaskList = saveTaskListInDatabase(copy);
            taskService.copyTaskToAnotherTaskList(taskList, newTaskList);
        }
    }

    private TaskList copyTaskList(TaskList taskList){
        TaskList copy = new TaskList();
        copy.setBoard(taskList.getBoard());
        copy.setCreateDate(taskList.getCreateDate());
        copy.setName(taskList.getName());
        copy.setUser(taskList.getUser());
        return copy;
    }
}
