package com.project.taskmanagement_backend.service;

import com.project.taskmanagement_backend.model.Task;
import com.project.taskmanagement_backend.model.TaskList;
import com.project.taskmanagement_backend.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class TaskService {

    private final TaskRepository taskRepository;

    @Autowired
    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public Task saveTaskInDatabase(Task task) {
        return taskRepository.save(task);
    }

    public List<Task> getAllTaskFromTaskList(Long idTaskList) {
        return new ArrayList<>(taskRepository.findByTaskListId(idTaskList));
    }

    public void deleteTask(Long id) {
        Optional<Task> taskOptional = taskRepository.findById(id);
        if (taskOptional.isPresent()) {
            taskRepository.delete(taskOptional.get());
        } else {
            throw new NoSuchElementException(String.valueOf(taskOptional));
        }
    }

    public Task updateTask(Long id, Task task) {
        Optional<Task> taskOptional = taskRepository.findById(id);
        if (taskOptional.isPresent()) {
            task.setId(id);
            return taskRepository.save(task);
        } else {
            throw new NoSuchElementException(String.valueOf(task));
        }
    }

    public void copyTaskToAnotherTaskList(TaskList oldList, TaskList newList) {
        List<Task> taskList = getAllTaskFromTaskList(oldList.getId());
        for (Task task : taskList) {
            Task copy = copyTask(task);
            copy.setTaskList(newList);
            copy.setOwnerUser(newList.getUser());
            saveTaskInDatabase(copy);
        }
    }

    private Task copyTask(Task task){
        Task copy = new Task();
        copy.setTaskList(task.getTaskList());
        copy.setCreateDate(task.getCreateDate());
        copy.setTitle(task.getTitle());
        copy.setContent(task.getContent());
        copy.setLabelColor(task.getLabelColor());
         return copy;
    }

}
