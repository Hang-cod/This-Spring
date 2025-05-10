package com.example.backend.dto;

import com.example.backend.entity.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EmotionRecordDTO {

    private Long id;
    private Long  userID;
    private String imageId;
    private String description;
    private LocalDate date;
}
