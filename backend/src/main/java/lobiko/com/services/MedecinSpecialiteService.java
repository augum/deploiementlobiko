package lobiko.com.services;

import lobiko.com.dtos.HopitalSpecialiteRequestDto;
import lobiko.com.dtos.HopitalSpecialiteResponseDto;
import lobiko.com.dtos.MedecinSpecialiteRequestDto;
import lobiko.com.dtos.MedecinSpecialiteResponseDto;

import java.util.List;

public interface MedecinSpecialiteService {
    MedecinSpecialiteResponseDto save(MedecinSpecialiteRequestDto requestDto);
    List<MedecinSpecialiteResponseDto> listMedecinSpecialite();
    List<MedecinSpecialiteResponseDto> listMedecinSpecialite(Long idSpecialite);


}
