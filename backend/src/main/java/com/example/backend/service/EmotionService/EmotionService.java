package com.example.backend.service.EmotionService;

import com.example.backend.dto.EmotionRecordDTO;

import java.util.List;


public interface EmotionService {
    void saveEmotion(EmotionRecordDTO dto);
    List<EmotionRecordDTO> getEmotionRecords(Long userId);
}
