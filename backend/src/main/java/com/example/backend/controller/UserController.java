package com.example.backend.controller;

import com.example.backend.dto.DeviceIdRequestDTO;
import com.example.backend.dto.UserResponseDTO;
import com.example.backend.service.users.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/check")
    public ResponseEntity<UserResponseDTO> checkOrCreateUser(@RequestBody DeviceIdRequestDTO dto) {
        return ResponseEntity.ok(userService.findOrCreateUser(dto.getDeviceId()));
    }
}