package com.project.taskmanagement_backend.controller;

import com.project.taskmanagement_backend.model.Workspace;
import com.project.taskmanagement_backend.service.WorkspaceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping(value = "/workspace")
public class WorkspaceController {

    private final WorkspaceService workspaceService;

    @Autowired
    public WorkspaceController(WorkspaceService workspaceService) {
        this.workspaceService = workspaceService;
    }

    @DeleteMapping("deleteWorkspace/{id}")
    public void deleteWorkspace(@PathVariable(name = "id") String id) {
        workspaceService.deleteWorkspace(id);
    }

    @PostMapping("/updateWorkspace")
    public Workspace updateName(@Valid @RequestBody Workspace workspace) {
        return workspaceService.updateWorkspace(workspace);
    }

}
