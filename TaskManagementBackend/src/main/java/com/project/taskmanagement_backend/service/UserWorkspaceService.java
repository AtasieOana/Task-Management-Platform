package com.project.taskmanagement_backend.service;

import com.project.taskmanagement_backend.model.*;
import com.project.taskmanagement_backend.repository.UserRepository;
import com.project.taskmanagement_backend.repository.UserWorkspaceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class UserWorkspaceService {

    private final UserWorkspaceRepository userWorkspaceRepository;
    private final WorkspaceService workspaceService;
    private final UserBoardService userBoardService;
    private final UserRepository userRepository;

    @Autowired
    public UserWorkspaceService(UserWorkspaceRepository userWorkspaceRepository, WorkspaceService workspaceService,
                                UserBoardService userBoardService, UserRepository userRepository) {
        this.userWorkspaceRepository = userWorkspaceRepository;
        this.workspaceService = workspaceService;
        this.userBoardService = userBoardService;
        this.userRepository = userRepository;
    }

    public UserWorkspace saveUserWorkspaceInDatabase(UserWorkspace userWorkspace){
        Optional<UserWorkspace> userWorkspaceOptional = userWorkspaceRepository.findByUserAndWorkspace(userWorkspace.getWorkspace().getId(), userWorkspace.getUser().getId());
        if (userWorkspaceOptional.isPresent()) {
            return null;
        }
        else{
            Workspace workspace = this.workspaceService.saveWorkspaceDatabase(userWorkspace.getWorkspace());
            userWorkspace.setWorkspace(workspace);
            return userWorkspaceRepository.save(userWorkspace);
        }
    }

    public void deleteUserWorkspaceInDatabase(String userWorkspaceId){
        Optional<UserWorkspace> userWorkspaceOptional = userWorkspaceRepository.findById(userWorkspaceId);
        if (userWorkspaceOptional.isPresent()) {
            this.userBoardService.deleteAllBoardsInWorkspaceForUser(userWorkspaceOptional.get().getWorkspace().getId(), userWorkspaceOptional.get().getUser().getId());
            userWorkspaceRepository.delete(userWorkspaceOptional.get());
        } else {
            throw new NoSuchElementException(String.valueOf(userWorkspaceOptional));
        }
    }

    public List<UserWorkspace> getWorkspacesForUser(String userEmail){
        return new ArrayList<>(userWorkspaceRepository.findByUserEmail(userEmail));
    }

    public UserWorkspace getWorkspaceById(String id){
        Optional<UserWorkspace> optionalUserWorkspace = userWorkspaceRepository.findById(id);
        return optionalUserWorkspace.orElse(null);
    }

    public List<UserWorkspace> getUserWorkspacesFromWorkspace(String workspaceId){
        return new ArrayList<>(userWorkspaceRepository.findByWorkspace(workspaceId));
    }

    public UserWorkspace addNewUserOnWorkspace(String email, String userType, Workspace workspace){
        Optional<User> user = userRepository.findByEmail(email);
        if(user.isPresent()) {
            Optional<UserWorkspace> userWorkspaceOptional = userWorkspaceRepository.findByUserAndWorkspace(workspace.getId(), user.get().getId());
            if (userWorkspaceOptional.isPresent()) {
                return null;
            } else {
                UserWorkspace userWorkspace = new UserWorkspace();
                userWorkspace.setWorkspace(workspace);
                userWorkspace.setUser(user.get());
                userWorkspace.setUserType(userType);
                userWorkspace.setUserAdditionDate(new Date(System.currentTimeMillis()));
                return userWorkspaceRepository.save(userWorkspace);
            }
        }
        return null;
    }

    public UserWorkspace updateUserWorkspace(UserWorkspace userWorkspace) {
        return userWorkspaceRepository.save(userWorkspace);
    }

    public List<User> getAllUsersFromWorkspace(String workspaceId){
        List<UserWorkspace> userWorkspaceList = userWorkspaceRepository.findByWorkspace(workspaceId);
        List<User> users = new ArrayList<>();
        userWorkspaceList.forEach(userWorkspace -> users.add(userWorkspace.getUser()));
        return users;
    }

}
