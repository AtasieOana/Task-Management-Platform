package com.project.taskmanagement_backend.service;

import com.project.taskmanagement_backend.model.User;
import com.project.taskmanagement_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.regex.Pattern;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final AuthenticationTokenService authenticationTokenService;
    private final EmailService emailService;

    @Autowired
    public UserService(UserRepository userRepository, AuthenticationTokenService authenticationTokenService, EmailService emailService) {
        this.userRepository = userRepository;
        this.authenticationTokenService = authenticationTokenService;
        this.emailService = emailService;
    }

    public User signUp(User user) {
        Optional<User> optionalUser = userRepository.findByEmail(user.getEmail());
        if(optionalUser.isPresent()){
            this.authenticationTokenService.sendAuthenticationEmail(optionalUser.get(), true);
            return optionalUser.get();
        }
        else {
            BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
            String encodedPassword = bCryptPasswordEncoder.encode(user.getPassword());
            user.setPassword(encodedPassword);
            User userDB = userRepository.save(user);
            this.authenticationTokenService.sendAuthenticationEmail(userDB, false);
            return userDB;
        }
    }

    public User login(String email, String password) {
        Optional<User> optionalUser = userRepository.findByEmail(email);
        if(optionalUser.isPresent()){
            if(optionalUser.get().isAccountEnabled()) {
                BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
                boolean passwordMatch = bCryptPasswordEncoder.matches(password, optionalUser.get().getPassword());
                if (!passwordMatch) {
                    return null;
                } else {
                    return optionalUser.get();
                }
            }
            else{
                return null;
            }
        }
        else{
            return null;
        }
    }

    public List<User> getAllUsers() {
        return new ArrayList<>(userRepository.findAll());
    }

    public User getUser(String email) {
        Optional<User> optionalUser = userRepository.findByEmail(email);
        return optionalUser.orElse(null);
    }

    public User getUserById(String userId) {
        Optional<User> optionalUser = userRepository.findById(userId);
        return optionalUser.orElse(null);
    }

    public User updateUser(String id, User user) {
        Optional<User> userOptional = userRepository.findById(id);
        if (userOptional.isPresent()) {
            BCryptPasswordEncoder bCryptPasswordEncoder =  new BCryptPasswordEncoder();
            Pattern BCRYPT_PATTERN = Pattern.compile("\\A\\$2a?\\$\\d\\d\\$[./0-9A-Za-z]{53}");
            if(!BCRYPT_PATTERN.matcher(user.getPassword()).matches()){
                String encodedPassword = bCryptPasswordEncoder.encode(user.getPassword());
                user.setPassword(encodedPassword);
            }
            user.setId(id);
            return userRepository.save(user);
        } else {
            throw new NoSuchElementException(String.valueOf(user));
        }
    }

    public User updateUserPassword(String id, String password) {
        Optional<User> userOptional = userRepository.findById(id);
        if (userOptional.isPresent()) {
            User editedUser = userOptional.get();
            BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
            String encodedPassword = bCryptPasswordEncoder.encode(password);
            editedUser.setPassword(encodedPassword);
            return userRepository.save(editedUser);
        } else {
            return null;
        }
    }

    public void deleteUser(String id) {
        Optional<User> userOptional = userRepository.findById(id);
        if (userOptional.isPresent()) {
            userRepository.delete(userOptional.get());
        } else {
            throw new NoSuchElementException(String.valueOf(userOptional));
        }
    }

    private User validateUser(String email){
        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.setAccountEnabled(true);
            return userRepository.save(user);
        } else {
            return null;
        }
    }

    public User verifyToken(String email, String token){
         boolean tokenValid = authenticationTokenService.verifyToken(email, token);
         if(tokenValid){
             return validateUser(email);
         }
         return null;
    }

    public User sendRecoverEmail(String email){
        Optional<User> optionalUser = userRepository.findByEmail(email);
        String message;
        message = optionalUser.map(user -> "To recover your password go to the next link: http://localhost:4200/newPassword/" + user.getId() + " .").orElse("There is no account with this email. Try to sign up.");
        emailService.sendEmailToUserAsync(email, "Hello, \n \n " + message + "  \n \n Have a great day, \n TASKO Team", "TASKO notification");
        return optionalUser.orElse(null);
    }

}
