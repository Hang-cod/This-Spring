package com.example.backend.service.gameResult;

import com.example.backend.dto.GameResultDTO;
import com.example.backend.entity.GameResult;
import com.example.backend.entity.User;
import com.example.backend.repository.GameResultRepository;
import com.example.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class GameResultServiceImpl implements GameResultService {

    private final GameResultRepository gameResultRepository;
    private final UserRepository userRepository;


    @Override
    public void saveGameResult(GameResultDTO gameResultDTO) {

        User user = userRepository.findById(gameResultDTO.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("해당 유저를 찾을 수 없습니다."));

        GameResult result = GameResult.builder()
                .gameType(gameResultDTO.getGameType())
                .wrongCount(gameResultDTO.getWrongCount())
                .date(gameResultDTO.getDate() != null ? gameResultDTO.getDate() : LocalDate.now())
                .build();

        gameResultRepository.save(result);
    }

    @Override
    public List<GameResultDTO> getGameResults(Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("해당 유저가 없습니다."));

        List<GameResult> resultList = gameResultRepository.findByUserAndDate(user, LocalDate.now());

        return resultList.stream().map(result ->
                GameResultDTO.builder()
                        .id(result.getId())
                        .userId(userId)
                        .gameType(result.getGameType())
                        .wrongCount(result.getWrongCount())
                        .date(result.getDate())
                        .build()
        ).toList();
    }
}
