package com.example.backend.controller;

import com.example.backend.dto.EmotionRecordDTO;
import com.example.backend.service.emotion.EmotionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/emotion")
@RequiredArgsConstructor
@CrossOrigin("origins = http://localhost:3000")
public class EmotionController {

    private final EmotionService emotionService;
    // 감정 기록 저장
    @PostMapping("/save")
    public ResponseEntity<String> saveEmotion(@RequestBody EmotionRecordDTO dto) {
        emotionService.saveEmotion(dto);
        return ResponseEntity.ok("감정 기록 저장 완료!");
    }

    // 감정 기록 조회
    @GetMapping("/{userId}")
    public ResponseEntity<List<EmotionRecordDTO>> getEmotionRecords(@PathVariable Long userId) {
        List<EmotionRecordDTO> records = emotionService.getEmotionRecords(userId);
        return ResponseEntity.ok(records);
    }
}
