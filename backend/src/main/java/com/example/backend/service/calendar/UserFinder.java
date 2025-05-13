package com.example.backend.service.calendar;

import com.example.backend.entity.User;
import com.example.backend.repository.UserRepository;

public class UserFinder {
    public static User findOrThrow(Long userId, UserRepository repo) {
        return repo.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 사용자입니다."));
    }
}