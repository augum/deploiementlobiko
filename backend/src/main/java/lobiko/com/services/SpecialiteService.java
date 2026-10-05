package lobiko.com.services;

import lobiko.com.dtos.SpecialiteRequestDto;
import lobiko.com.dtos.SpecialiteResponseDto;

import java.util.List;

public interface SpecialiteService {
    SpecialiteResponseDto save(SpecialiteRequestDto requestDto);
    SpecialiteResponseDto update(Long id, SpecialiteRequestDto requestDto);
    List<SpecialiteResponseDto> specialiteList();
    SpecialiteResponseDto getSpecialite(Long id);

}
