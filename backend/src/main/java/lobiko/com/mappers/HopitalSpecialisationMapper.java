package lobiko.com.mappers;

import lobiko.com.dtos.HopitalSpecialiteRequestDto;
import lobiko.com.dtos.HopitalSpecialiteResponseDto;
import lobiko.com.entities.HopitalSpecialisation;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface HopitalSpecialisationMapper {
    /*
     * le mappage des entités JPA et les DTOs
     *
     * */
    HopitalSpecialiteResponseDto HopitalSpecialiteToHopitalSpecialiteResponseDto(HopitalSpecialisation specialisation);
    HopitalSpecialisation fromHopitalSpecialiteDto(HopitalSpecialiteRequestDto requestDto);
}
