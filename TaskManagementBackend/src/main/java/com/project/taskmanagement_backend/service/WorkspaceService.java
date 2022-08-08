package com.project.taskmanagement_backend.service;

import com.project.taskmanagement_backend.model.Board;
import com.project.taskmanagement_backend.model.Workspace;
import com.project.taskmanagement_backend.repository.WorkspaceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class WorkspaceService {

    private final WorkspaceRepository workspaceRepository;

    @Autowired
    public WorkspaceService(WorkspaceRepository workspaceRepository) {
        this.workspaceRepository = workspaceRepository;
    }

    public Workspace saveWorkspaceDatabase(Workspace workspace) {
        Optional<Workspace> optionalWorkspace = this.workspaceRepository.findById(workspace.getId());
        if(optionalWorkspace.isPresent())
            return workspace;
        else
            return workspaceRepository.save(workspace);
    }

    public void deleteWorkspace(String id){
        Optional<Workspace> workspaceOptional = workspaceRepository.findById(id);
        if (workspaceOptional.isPresent()) {
            workspaceRepository.delete(workspaceOptional.get());
        } else {
            throw new NoSuchElementException(String.valueOf(workspaceOptional));
        }
    }

    public Workspace updateWorkspace(Workspace workspace) {
        return workspaceRepository.save(workspace);
    }
}
