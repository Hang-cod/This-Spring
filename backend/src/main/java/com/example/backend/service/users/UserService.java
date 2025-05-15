package com.example.backend.service.users;

import com.example.backend.dto.UserResponseDTO;

public interface UserService {
    UserResponseDTO findOrCreateUser(String deviceId);
}
