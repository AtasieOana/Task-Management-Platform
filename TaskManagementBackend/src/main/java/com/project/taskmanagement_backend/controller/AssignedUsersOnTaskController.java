package com.project.taskmanagement_backend.controller;

import com.project.taskmanagement_backend.model.AssignedUsersOnTask;
import com.project.taskmanagement_backend.service.AssignedUsersOnTaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping(value = "/user/task")
public class AssignedUsersOnTaskController {

    private final AssignedUsersOnTaskService assignedUsersOnTaskService;

    @Autowired
    public AssignedUsersOnTaskController(AssignedUsersOnTaskService assignedUsersOnTaskService) {
        this.assignedUsersOnTaskService = assignedUsersOnTaskService;
    }

    @PostMapping("/assignUserOnTask")
    public AssignedUsersOnTask assignUserOnTask(@Valid @RequestBody AssignedUsersOnTask assignedUsersOnTask) {
        return assignedUsersOnTaskService.assignUserOnTask(assignedUsersOnTask);
    }

    @DeleteMapping("/deleteAssignments/{taskId}/{userId}")
    public void deleteAssignments(@PathVariable(name = "taskId") Long taskId, @PathVariable(name = "userId") Long userId) {
        assignedUsersOnTaskService.deleteAssignmentUserOnTask(taskId, userId);
    }


    @GetMapping("/getAssignedUsers/{taskId}")
    public List<AssignedUsersOnTask> getAssignedUsers(@PathVariable Long taskId){
        return assignedUsersOnTaskService.getAssignedUsers(taskId);
    }
}
