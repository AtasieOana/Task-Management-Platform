package com.project.taskmanagement_backend.controller;

import com.project.taskmanagement_backend.model.UserMessage;
import com.project.taskmanagement_backend.service.UserMessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping(value = "/user/message")
public class UserMessageController {

    private final UserMessageService userMessageService;

    @Autowired
    public UserMessageController(UserMessageService userMessageService) {
        this.userMessageService = userMessageService;
    }

    @GetMapping("/getMessagesOfBoardSeenByUser/{idBoard}/{email}")
    public List<UserMessage> getMessagesOfBoardSeenByUser(@PathVariable String idBoard, @PathVariable String email){
        return userMessageService.getMessagesOfBoardSeenByUser(idBoard, email);
    }

    @GetMapping("/getMessagesOfBoardNotSeenByUser/{idBoard}/{email}")
    public List<UserMessage> getMessagesOfBoardNotSeenByUser(@PathVariable String idBoard, @PathVariable String email){
        return userMessageService.getMessagesOfBoardNotSeenByUser(idBoard, email);
    }

    @GetMapping("/getMessagesOfBoardAndUser/{idBoard}/{email}")
    public List<UserMessage> getMessagesOfBoardAndUser(@PathVariable String idBoard, @PathVariable String email){
        return userMessageService.getMessagesOfBoardAndUser(idBoard, email);
    }

    @GetMapping("/markReadAllMessages/{idBoard}/{email}")
    public List<UserMessage> markReadAllMessages(@PathVariable String idBoard, @PathVariable String email){
        return userMessageService.markReadAllMessages(idBoard, email);
    }

    @GetMapping("/findNotReadMessagesNumber/{idBoard}/{idUser}")
    public int findNotReadChatMessagesNumber(@PathVariable String idBoard, @PathVariable String idUser){
        return userMessageService.findNotReadChatMessagesNumber(idBoard, idUser);
    }

}
