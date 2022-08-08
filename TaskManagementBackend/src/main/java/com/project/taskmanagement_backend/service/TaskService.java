package com.project.taskmanagement_backend.service;

import com.project.taskmanagement_backend.model.Task;
import com.project.taskmanagement_backend.model.TaskList;
import com.project.taskmanagement_backend.repository.TaskListRepository;
import com.project.taskmanagement_backend.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class TaskService {

    private final TaskRepository taskRepository;
    private final TaskListRepository taskListRepository;

    @Autowired
    public TaskService(TaskRepository taskRepository, TaskListRepository taskListRepository) {
        this.taskRepository = taskRepository;
        this.taskListRepository = taskListRepository;
    }

    public Task saveTaskInDatabase(Task task) {
        return taskRepository.save(task);
    }

    public List<Task> getAllTaskFromTaskList(String idTaskList) {
        return new ArrayList<>(taskRepository.findByTaskListId(idTaskList));
    }

    public List<Task> getAllTaskFromBoardOrderByStartDate(String boardId) {
        return new ArrayList<>(taskRepository.findByBoardIdOrderByStartDate(boardId));
    }

    public List<Task> getAllTaskFromBoardOrderByEndDate(String boardId) {
        return new ArrayList<>(taskRepository.findByBoardIdOrderByEndDate(boardId));
    }

    public List<Task> getAllTaskFromBoardWithoutStartDate(String boardId) {
        return new ArrayList<>(taskRepository.findByBoardIdWithoutStartDate(boardId));
    }

    public List<Task> getAllTaskFromBoardWithoutEndDate(String boardId) {
        return new ArrayList<>(taskRepository.findByBoardIdWithoutEndDate(boardId));
    }

    public Task getTaskById(String taskId) {
        Optional<Task> optionalTask = taskRepository.findById(taskId);
        return optionalTask.orElse(null);
    }

    public void deleteTask(String id) {
        Optional<Task> taskOptional = taskRepository.findById(id);
        if (taskOptional.isPresent()) {
            taskRepository.delete(taskOptional.get());
        } else {
            throw new NoSuchElementException(String.valueOf(taskOptional));
        }
    }

    public Task updateTask(String id, Task task) {
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
        copy.setOrderInList(task.getOrderInList());
         return copy;
    }

    @Transactional
    public Task changeTaskPosition(String taskListId, Task taskWithNewPosition) {
        Optional<Task> taskOptional = taskRepository.findById(taskWithNewPosition.getId());
        if (taskOptional.isPresent()) {
            Task task = taskOptional.get();
            Optional<TaskList> taskList = this.taskListRepository.findById(taskListId);
            if(taskList.isPresent()){
                int oldPosition = task.getOrderInList();
                int newPosition = taskWithNewPosition.getOrderInList();

                if (newPosition > oldPosition) {
                    taskRepository.decrementAboveToPosition(newPosition, oldPosition, task.getId(), taskListId);
                } else {
                    taskRepository.incrementBelowToPosition(newPosition, oldPosition, task.getId(), taskListId);
                }

                if(!task.getTaskList().getId().equals(taskListId)){
                    task.setTaskList(taskList.get());
                }
                task.setOrderInList(newPosition);
                return taskRepository.save(task);
            }

        }
        return null;
    }
}
