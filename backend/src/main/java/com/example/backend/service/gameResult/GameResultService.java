package com.example.backend.service.gameResult;

import com.example.backend.dto.GameResultDTO;

import java.util.List;

public interface GameResultService {
    void saveGameResult(GameResultDTO dto);
    List<GameResultDTO> getGameResults(Long userId);
}
