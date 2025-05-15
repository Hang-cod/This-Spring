package com.example.backend.service.calendar;

import com.example.backend.dto.CalendarStatsDTO;
import com.example.backend.entity.EmotionRecord;
import com.example.backend.entity.User;
import com.example.backend.repository.EmotionRecordRepository;
import com.example.backend.repository.GameResultRepository;
import com.example.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Primary
public class CalendarStatsServiceImpl implements CalendarStatsService {

    @Qualifier("emotionStatsService")
    private final CalendarStatsService emotionStatsService;

    @Qualifier("gameStatsService")
    private final CalendarStatsService gameStatsService;

    private final UserRepository userRepository;

    @Override
    public List<CalendarStatsDTO> getStatsByUser(Long userId) {
        User user = UserFinder.findOrThrow(userId, userRepository);

        Map<LocalDate, Integer> wrongCountMap = gameStatsService.getWrongCountByDate(user);
        Map<LocalDate, EmotionRecord> emotionMap = emotionStatsService.getEmotionByDate(user);

        return CalendarStatsAssembler.assemble(wrongCountMap, emotionMap);
    }

    @Override
    public Map<LocalDate, Integer> getWrongCountByDate(User user) {
        throw new UnsupportedOperationException();
    }

    @Override
    public Map<LocalDate, EmotionRecord> getEmotionByDate(User user) {
        throw new UnsupportedOperationException();
    }
}

