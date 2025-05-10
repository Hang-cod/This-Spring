package com.example.backend.dto;

import com.example.backend.entity.GameType;
import com.example.backend.entity.User;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GameResultDTO {
    private Long id;
    //User 객체 전체를 넘기기보단, userId만 넘기는 게 일반적
    //JSON 직렬화 시 순환 참조 위험이 있고, DTO는 엔티티를 직접 담지 않는 것이 원칙
    private Long  userId;
    private GameType gameType;
    private int wrongCount;
    private LocalDate date;
}
