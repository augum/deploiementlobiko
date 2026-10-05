package lobiko.com.mappers;

import lobiko.com.dtos.HopitalSpecialiteRequestDto;
import lobiko.com.dtos.HopitalSpecialiteResponseDto;
import lobiko.com.dtos.MedecinSpecialiteRequestDto;
import lobiko.com.dtos.MedecinSpecialiteResponseDto;
import lobiko.com.entities.HopitalSpecialisation;
import lobiko.com.entities.MedecinSpecialite;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface MedecinSpecialisationMapper {
    /*
     * le mappage des entités JPA et les DTOs
     *
     * */
    MedecinSpecialiteResponseDto MedecinSpecialiteToMedecinSpecialiteResponseDto(MedecinSpecialite medecinSpecialite);
    MedecinSpecialite fromMedecinSpecialiteDto(MedecinSpecialiteRequestDto requestDto);
}
