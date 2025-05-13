package com.example.backend.service.calendar;

import com.example.backend.dto.CalendarStatsDTO;
import com.example.backend.entity.EmotionRecord;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

public class CalendarStatsAssembler {
    public static List<CalendarStatsDTO> assemble(
            Map<LocalDate, Integer> wrongCountMap,
            Map<LocalDate, EmotionRecord> emotionMap
    ) {
        Set<LocalDate> allDates = new HashSet<>();
        allDates.addAll(wrongCountMap.keySet());
        allDates.addAll(emotionMap.keySet());

        return allDates.stream()
                .map(date -> CalendarStatsDTO.builder()
                        .date(date)
                        .totalWrongCount(wrongCountMap.getOrDefault(date, 0))
                        .hasEmotion(emotionMap.containsKey(date))
                        .emotionSummary(
                                emotionMap.containsKey(date) ? emotionMap.get(date).getDescription() : ""
                        )
                        .build()
                )
                .sorted(Comparator.comparing(CalendarStatsDTO::getDate))
                .collect(Collectors.toList());
    }
}