package lobiko.com.mappers;

import lobiko.com.dtos.HopitalRequestDto;
import lobiko.com.dtos.HopitalResponseDto;
import lobiko.com.entities.Hopital;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface HopitalMapper {
    /*
     * le mappage des entités JPA et les DTOs
     *
     * */
    HopitalResponseDto hopitalToHopitalResponseDto(Hopital hopital);
    Hopital fromHopitalRequestDto(HopitalRequestDto requestDto);

}
