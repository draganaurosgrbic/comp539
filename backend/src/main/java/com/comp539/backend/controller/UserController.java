package com.comp539.backend.controller;

import com.comp539.backend.dto.UserDTO;
import com.comp539.backend.model.User;
import com.comp539.backend.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/api/user", produces = MediaType.APPLICATION_JSON_VALUE)
@AllArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/login")
    public ResponseEntity<UserDTO> login(@RequestBody UserDTO userDTO) {
        User user = userService.login(userDTO.getEmail(), userDTO.getPassword());
        return user != null ? ResponseEntity.ok(new UserDTO(user)) : ResponseEntity.notFound().build();
    }

    @PostMapping("/register")
    public ResponseEntity<UserDTO> register(@RequestBody UserDTO userDTO) {
        User user = userService.register(new User(userDTO.getEmail(), userDTO.getPassword(), userDTO.getFirstName(), userDTO.getLastName()));
        return user != null ? ResponseEntity.ok(new UserDTO(user)) : ResponseEntity.badRequest().build();
    }

}
