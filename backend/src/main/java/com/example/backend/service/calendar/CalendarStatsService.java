package com.example.backend.service.calendar;

import com.example.backend.dto.CalendarStatsDTO;
import com.example.backend.entity.EmotionRecord;
import com.example.backend.entity.User;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

public interface CalendarStatsService {
    List<CalendarStatsDTO> getStatsByUser(Long userId);
    Map<LocalDate, Integer> getWrongCountByDate(User user);
    Map<LocalDate, EmotionRecord> getEmotionByDate(User user);
}

