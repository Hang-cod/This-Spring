package com.example.backend.service.emotion;

import com.example.backend.dto.EmotionRecordDTO;
import com.example.backend.entity.EmotionRecord;
import com.example.backend.entity.User;
import com.example.backend.repository.EmotionRecordRepository;
import com.example.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

//서술내용 서비스로직
@Service
@RequiredArgsConstructor
public class EmotionServiceImpl implements EmotionService {

    private final EmotionRecordRepository emotionRecordRepository;
    private final UserRepository userRepository;


    @Override
    public void saveEmotion(EmotionRecordDTO dto) {

        //예외처리
        User user = userRepository.findById(dto.getUserID())
                .orElseThrow(() -> new IllegalArgumentException("유저를 찾을 수 없습니다."));

        EmotionRecord record = EmotionRecord.builder()
                .user(user)
                .imageId(dto.getImageId())
                .description(dto.getDescription())
                .date(LocalDate.now())
                .build();

        emotionRecordRepository.save(record);
    }

    @Override
    public List<EmotionRecordDTO> getEmotionRecords(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("유저를 찾을 수 없습니다."));

        List<EmotionRecord> records =emotionRecordRepository.findByUserAndDate(user,LocalDate.now());
       return records.stream().map(record -> EmotionRecordDTO.builder()
               .id(record.getId())
               .userID(userId)
               .imageId(record.getImageId())
               .description(record.getDescription())
               .date(record.getDate())
               .build())
               .toList();
    }
}
