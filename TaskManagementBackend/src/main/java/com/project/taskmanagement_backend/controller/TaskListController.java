package com.project.taskmanagement_backend.controller;

import com.project.taskmanagement_backend.model.TaskList;
import com.project.taskmanagement_backend.model.User;
import com.project.taskmanagement_backend.service.TaskListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping(value = "/taskList")
public class TaskListController {

    private final TaskListService taskListService;

    @Autowired
    public TaskListController(TaskListService taskListService) {
        this.taskListService = taskListService;
    }

    @GetMapping("/getTaskListsInBoard/{idBoard}")
    public List<TaskList> getAllTaskListsInBoard(@PathVariable String idBoard){
        return taskListService.getAllTaskListFromABoard(idBoard);
    }

    @PostMapping("/createTaskList")
    public TaskList createBoard(@Valid @RequestBody TaskList taskList) {
        return taskListService.saveTaskListInDatabase(taskList);
    }

    @DeleteMapping("deleteTaskList/{id}")
    public void deleteTaskList(@PathVariable(name = "id") String id) {
        taskListService.deleteTaskList(id);
    }

    @PutMapping("updateTaskList/{id}")
    public TaskList updateTaskList(@PathVariable(name = "id") String id,
                                  @Valid @RequestBody TaskList taskList) {
        return taskListService.updateTaskList(id, taskList);
    }

    @PostMapping("/copyTaskListToAnotherBoard/{idOldBoard}/{idNewBoard}")
    public void copyTaskListToAnotherBoard(@PathVariable String idOldBoard, @PathVariable String idNewBoard,
                                           @Valid @RequestBody User user) {
        taskListService.copyTaskListToAnotherBoard(idOldBoard, idNewBoard, user);
    }
}
