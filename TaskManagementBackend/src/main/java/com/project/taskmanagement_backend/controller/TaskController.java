package com.project.taskmanagement_backend.controller;

import com.project.taskmanagement_backend.model.Task;
import com.project.taskmanagement_backend.model.TaskList;
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
    public List<Task> getAllTaskFromTaskList(@PathVariable Long idTaskList){
        return taskService.getAllTaskFromTaskList(idTaskList);
    }

    @PostMapping("/createTask")
    public Task createBoard(@Valid @RequestBody Task task) {
        return taskService.saveTaskInDatabase(task);
    }

    @DeleteMapping("deleteTask/{id}")
    public void deleteTaskList(@PathVariable(name = "id") Long id) {
        taskService.deleteTask(id);
    }

    @PutMapping("updateTask/{id}")
    public Task updateTask(@PathVariable(name = "id") Long id,
                           @Valid @RequestBody Task task) {
        return taskService.updateTask(id, task);
    }
}
