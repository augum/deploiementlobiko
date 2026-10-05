package lobiko.com.services;

import lobiko.com.dtos.HopitalSpecialiteRequestDto;
import lobiko.com.dtos.HopitalSpecialiteResponseDto;

import java.util.List;

public interface HopitalSpecialiteService {
    HopitalSpecialiteResponseDto save(HopitalSpecialiteRequestDto requestDto);
    List<HopitalSpecialiteResponseDto> listHopitalSpecialite();
    List<HopitalSpecialiteResponseDto> listHopitalSpecialite(Long idSpecialite);


}
