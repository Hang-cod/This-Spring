package com.example.backend.service.users;

import com.example.backend.dto.UserResponseDTO;
import com.example.backend.entity.User;
import com.example.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{

    private final UserRepository userRepository;

    @Override
    public UserResponseDTO findOrCreateUser(String deviceId) {
        return userRepository.findByDeviceId(deviceId)
                .map(user -> new UserResponseDTO(user.getId(), user.getNickname()))
                .orElseGet(() -> {
                    User newUser = User.builder()
                            .deviceId(deviceId)
                            .nickname("봄이") // 또는 랜덤 닉네임 생성 가능
                            .build();
                    User saved = userRepository.save(newUser);
                    return new UserResponseDTO(saved.getId(), saved.getNickname());
                });
    }
}
