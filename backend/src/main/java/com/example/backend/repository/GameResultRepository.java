package com.example.backend.repository;

import com.example.backend.entity.GameResult;
import com.example.backend.entity.GameType;
import com.example.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface GameResultRepository extends JpaRepository<GameResult, Long> {

    List<GameResult> findByUserAndDate(User user, LocalDate date);

    List<GameResult> findByUserAndGameType(User user, GameType gameType);

    int countByUserAndDate(User user, LocalDate date);
}
