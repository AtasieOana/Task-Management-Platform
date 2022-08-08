package com.project.taskmanagement_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class TaskManagementBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(TaskManagementBackendApplication.class, args);
    }
}
