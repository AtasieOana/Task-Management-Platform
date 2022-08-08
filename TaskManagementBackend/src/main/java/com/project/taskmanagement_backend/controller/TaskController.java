package com.project.taskmanagement_backend.controller;

import com.project.taskmanagement_backend.model.Task;
import com.project.taskmanagement_backend.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping(value = "/task")
public class TaskController {

    private final TaskService taskService;

    @Autowired
    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping("/getTaskFromTaskList/{idTaskList}")
    public List<Task> getAllTaskFromTaskList(@PathVariable String idTaskList){
        return taskService.getAllTaskFromTaskList(idTaskList);
    }

    @GetMapping("/getAllTaskFromBoardOrderByStartDate/{boardId}")
    public List<Task> getAllTaskFromBoardOrderByStartDate(@PathVariable String boardId){
        return taskService.getAllTaskFromBoardOrderByStartDate(boardId);
    }

    @GetMapping("/getAllTaskFromBoardOrderByEndDate/{boardId}")
    public List<Task> getAllTaskFromBoardOrderByEndDate(@PathVariable String boardId){
        return taskService.getAllTaskFromBoardOrderByEndDate(boardId);
    }

    @GetMapping("/getAllTaskFromBoardWithoutStartDate/{boardId}")
    public List<Task> getAllTaskFromBoardWithoutStartDate(@PathVariable String boardId){
        return taskService.getAllTaskFromBoardWithoutStartDate(boardId);
    }

    @GetMapping("/getAllTaskFromBoardWithoutEndDate/{boardId}")
    public List<Task> getAllTaskFromBoardWithoutEndDate(@PathVariable String boardId){
        return taskService.getAllTaskFromBoardWithoutEndDate(boardId);
    }

    @PostMapping("/createTask")
    public Task createBoard(@Valid @RequestBody Task task) {
        return taskService.saveTaskInDatabase(task);
    }

    @DeleteMapping("deleteTask/{id}")
    public void deleteTaskList(@PathVariable(name = "id") String id) {
        taskService.deleteTask(id);
    }

    @PutMapping("updateTask/{id}")
    public Task updateTask(@PathVariable(name = "id") String id,
                           @Valid @RequestBody Task task) {
        return taskService.updateTask(id, task);
    }

    @PutMapping("changeTaskPosition/{taskListId}")
    public Task changeTaskPosition(@PathVariable(name = "taskListId") String taskListId, @Valid @RequestBody Task task) {
        return taskService.changeTaskPosition(taskListId, task);
    }
}
