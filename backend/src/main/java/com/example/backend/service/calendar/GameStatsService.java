package com.example.backend.service.calendar;

import com.example.backend.dto.CalendarStatsDTO;
import com.example.backend.entity.EmotionRecord;
import com.example.backend.entity.User;
import com.example.backend.repository.GameResultRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service("gameStatsService")
@RequiredArgsConstructor
public class GameStatsService implements CalendarStatsService {

    private final GameResultRepository repo;

    @Override
    public Map<LocalDate, Integer> getWrongCountByDate(User user) {
        List<Object[]> results = repo.findDailyWrongCount(user);

        return results.stream().collect(Collectors.toMap(
                row -> (LocalDate) row[0],
                row -> ((Long) row[1]).intValue()  // SUM()은 Long으로 리턴됨
        ));
    }

    @Override
    public List<CalendarStatsDTO> getStatsByUser(Long userId) {
        throw new UnsupportedOperationException();
    }

    @Override
    public Map<LocalDate, EmotionRecord> getEmotionByDate(User user) {
        throw new UnsupportedOperationException();
    }
}
