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
    public User signUp(@Valid @RequestBody User user) {
        if( userService.getUser(user.getEmail()) == null) {
            return userService.signUp(user);
        }
        else return null;
    }

    @GetMapping("login/{email}/{password}")
    public User login(@PathVariable String email, @PathVariable String password){
        return userService.login(email, password);
    }

    @GetMapping("check/{email}")
    public User getUser(@PathVariable String email) {
        return userService.getUser(email);
    }

    @DeleteMapping("deleteUser/{id}")
    public void deleteTaskList(@PathVariable(name = "id") Long id) {
        userService.deleteUser(id);
    }

    @PutMapping("updateUser/{id}")
    public User updateTask(@PathVariable(name = "id") Long id,
                           @Valid @RequestBody User user) {
        return userService.updateUser(id, user);
    }

}
