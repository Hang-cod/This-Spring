package com.example.backend.controller;

import com.example.backend.dto.CalendarStatsDTO;
import com.example.backend.service.calendar.CalendarStatsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/statistics")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class CalendarStatsController {

    private final CalendarStatsService calendarStatsService;

    @GetMapping("/calendar")
    public ResponseEntity<List<CalendarStatsDTO>> getCalendarStats(@RequestParam Long userId) {
        return ResponseEntity.ok(calendarStatsService.getStatsByUser(userId));
    }
}
