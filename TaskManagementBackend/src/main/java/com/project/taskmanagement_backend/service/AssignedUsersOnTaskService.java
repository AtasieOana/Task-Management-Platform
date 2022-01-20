package com.project.taskmanagement_backend.service;

import com.project.taskmanagement_backend.model.AssignedUsersOnTask;
import com.project.taskmanagement_backend.model.UserBoard;
import com.project.taskmanagement_backend.repository.AssignedUsersOnTaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class AssignedUsersOnTaskService {

    private final AssignedUsersOnTaskRepository assignedUsersOnTaskRepository;

    @Autowired
    public AssignedUsersOnTaskService(AssignedUsersOnTaskRepository assignedUsersOnTaskRepository) {
        this.assignedUsersOnTaskRepository = assignedUsersOnTaskRepository;
    }

    public AssignedUsersOnTask assignUserOnTask(AssignedUsersOnTask assignedUsersOnTask) {
        return assignedUsersOnTaskRepository.save(assignedUsersOnTask);
    }

    public void deleteAssignmentUserOnTask(Long taskId, Long userId) {
        Optional<AssignedUsersOnTask> assignedUsersOnTaskOptional = assignedUsersOnTaskRepository.findByTaskAndUserId(taskId, userId);
        if (assignedUsersOnTaskOptional.isPresent()) {
            assignedUsersOnTaskRepository.delete(assignedUsersOnTaskOptional.get());
        } else {
            throw new NoSuchElementException(String.valueOf(assignedUsersOnTaskOptional));
        }
    }

    public List<AssignedUsersOnTask> getAssignedUsers(Long idTask) {
        return new ArrayList<>(assignedUsersOnTaskRepository.findByTaskId(idTask));
    }


}
