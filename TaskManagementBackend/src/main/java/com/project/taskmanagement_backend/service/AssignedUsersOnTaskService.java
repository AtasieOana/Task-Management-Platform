package com.project.taskmanagement_backend.service;

import com.project.taskmanagement_backend.model.AssignedUsersOnTask;
import com.project.taskmanagement_backend.model.Task;
import com.project.taskmanagement_backend.model.User;
import com.project.taskmanagement_backend.repository.AssignedUsersOnTaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.sql.Date;
import java.text.SimpleDateFormat;
import java.util.*;

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

    public void deleteAssignmentUserOnTask(String taskId, String userId) {
        Optional<AssignedUsersOnTask> assignedUsersOnTaskOptional = assignedUsersOnTaskRepository.findByTaskAndUserId(taskId, userId);
        if (assignedUsersOnTaskOptional.isPresent()) {
            assignedUsersOnTaskRepository.delete(assignedUsersOnTaskOptional.get());
        } else {
            throw new NoSuchElementException(String.valueOf(assignedUsersOnTaskOptional));
        }
    }

    public List<AssignedUsersOnTask> getAssignedUsers(String idTask) {
        return new ArrayList<>(assignedUsersOnTaskRepository.findByTaskId(idTask));
    }

    public List<AssignedUsersOnTask> getTasksForUser(String userId) {
        return assignedUsersOnTaskRepository.findByUserId(userId);
    }

    public List<Task> getAllTaskForUserFromBoard(String userId, String boardId){
        List<AssignedUsersOnTask> assignedUsersOnTaskList = assignedUsersOnTaskRepository.findByBoardAndUserId(boardId, userId);
        List<Task> taskList = new ArrayList<>();
        for(AssignedUsersOnTask assignedUsersOnTask : assignedUsersOnTaskList){
            taskList.add(assignedUsersOnTask.getTask());
        }
        return taskList;
    }

}
