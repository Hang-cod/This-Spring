package com.example.backend.service.calendar;

import com.example.backend.dto.CalendarStatsDTO;
import com.example.backend.entity.EmotionRecord;
import com.example.backend.entity.User;
import com.example.backend.repository.EmotionRecordRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service("emotionStatsService")
@RequiredArgsConstructor
public class EmotionStatsService implements CalendarStatsService {

    private final EmotionRecordRepository repo;

    @Override
    public Map<LocalDate, EmotionRecord> getEmotionByDate(User user) {
        return repo.findByUser(user).stream()
                .collect(Collectors.toMap(
                        EmotionRecord::getDate,
                        r -> r,
                        (r1, r2) -> r1
                ));
    }

    @Override
    public List<CalendarStatsDTO> getStatsByUser(Long userId) {
        throw new UnsupportedOperationException();
    }

    @Override
    public Map<LocalDate, Integer> getWrongCountByDate(User user) {
        throw new UnsupportedOperationException();
    }
}
