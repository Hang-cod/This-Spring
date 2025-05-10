package com.example.backend.repository;

import com.example.backend.entity.EmotionRecord;
import com.example.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface EmotionRecordRepository extends JpaRepository<EmotionRecord, Long> {
    List<EmotionRecord> findByUserAndDate(User user, LocalDate date);
}
