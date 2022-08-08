package com.project.taskmanagement_backend.controller;

import com.project.taskmanagement_backend.model.User;
import com.project.taskmanagement_backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping(value = "/user")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/seeUsers")
    public List<User> getAllUsers(){
        return userService.getAllUsers();
    }

    @PostMapping("/signUp")
    public User signUp(@Valid @RequestBody User user) throws InterruptedException {
        return userService.signUp(user);
    }

    @GetMapping("/login/{email}/{password}")
    public User login(@PathVariable String email, @PathVariable String password){
        return userService.login(email, password);
    }

    @GetMapping("check/{email}")
    public User getUser(@PathVariable String email) {
        return userService.getUser(email);
    }

    @DeleteMapping("deleteUser/{id}")
    public void deleteTaskList(@PathVariable(name = "id") String id) {
        userService.deleteUser(id);
    }

    @PutMapping("updateUser/{id}")
    public User updateTask(@PathVariable(name = "id") String id,
                           @Valid @RequestBody User user) {
        return userService.updateUser(id, user);
    }

    @PutMapping("updateUserPassword/{id}/{password}")
    public User updateTask(@PathVariable String id, @PathVariable String password) {
        return userService.updateUserPassword(id, password);
    }

    @GetMapping("/checkToken/{email}/{token}")
    public User copyTaskListToAnotherBoard(@PathVariable String email, @PathVariable String token) {
        return userService.verifyToken(email, token);
    }

    @GetMapping("sendRecoverEmail/{email}")
    public User sendRecoverEmail(@PathVariable String email){
        return userService.sendRecoverEmail(email);
    }

}
