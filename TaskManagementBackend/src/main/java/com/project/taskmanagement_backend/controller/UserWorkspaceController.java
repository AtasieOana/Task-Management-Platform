package com.project.taskmanagement_backend.controller;

import com.project.taskmanagement_backend.model.User;
import com.project.taskmanagement_backend.model.UserWorkspace;
import com.project.taskmanagement_backend.model.Workspace;
import com.project.taskmanagement_backend.service.UserWorkspaceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;


@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping(value = "/user/workspace")
public class UserWorkspaceController {

    private final UserWorkspaceService userWorkspaceService;

    @Autowired
    public UserWorkspaceController(UserWorkspaceService userWorkspaceService) {
        this.userWorkspaceService = userWorkspaceService;
    }

    @PostMapping("/saveWorkspace")
    public UserWorkspace saveUserWorkspaceInDatabase(@Valid @RequestBody UserWorkspace userWorkspace){
        return userWorkspaceService.saveUserWorkspaceInDatabase(userWorkspace);
    }

    @DeleteMapping("/deleteWorkspaceUser/{userWorkspaceId}")
    public void deleteUserWorkspaceInDatabase(@PathVariable String userWorkspaceId){
        userWorkspaceService.deleteUserWorkspaceInDatabase(userWorkspaceId);
    }

    @GetMapping("/getWorkspacesOfUser/{email}")
    public List<UserWorkspace> getWorkspacesOfUser(@PathVariable String email){
        return userWorkspaceService.getWorkspacesForUser(email);
    }

    @GetMapping("/getAllUsersFromWorkspace/{workspaceId}")
    public List<User> getAllUsersFromWorkspace(@PathVariable String workspaceId){
        return userWorkspaceService.getAllUsersFromWorkspace(workspaceId);
    }

    @GetMapping("/getWorkspaceById/{id}")
    public UserWorkspace getWorkspaceById(@PathVariable String id){
        return userWorkspaceService.getWorkspaceById(id);
    }

    @GetMapping("/getUserWorkspacesFromWorkspace/{workspaceId}")
    public List<UserWorkspace> getUserWorkspacesFromWorkspace(@PathVariable String workspaceId){
        return userWorkspaceService.getUserWorkspacesFromWorkspace(workspaceId);
    }

    @PostMapping("/addNewUserOnWorkspace/{email}/{userType}")
    public UserWorkspace addNewUserOnWorkspace(@PathVariable String email, @PathVariable String userType, @Valid @RequestBody Workspace workspace){
        return userWorkspaceService.addNewUserOnWorkspace(email, userType, workspace);
    }

    @PostMapping("/updateUserWorkspace")
    public UserWorkspace updateName(@Valid @RequestBody UserWorkspace userWorkspace) {
        return userWorkspaceService.updateUserWorkspace(userWorkspace);
    }

}
