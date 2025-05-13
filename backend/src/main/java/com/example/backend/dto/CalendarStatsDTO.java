package com.example.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
public class CalendarStatsDTO {
    private LocalDate date;         // 날짜
    private int totalWrongCount;    // 해당 날짜의 전체 오답 수
    private boolean hasEmotion;     // 감정 서술 여부
    private String emotionSummary;  // 감정 서술 내용 (null 불가능)
}
