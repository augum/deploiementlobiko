package lobiko.com.mappers;

import lobiko.com.dtos.BanqueRequestDto;
import lobiko.com.dtos.BanqueResponseDto;
import lobiko.com.dtos.HopitalRequestDto;
import lobiko.com.dtos.HopitalResponseDto;
import lobiko.com.entities.Banque;
import lobiko.com.entities.Hopital;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface BanqueMapper {
    /*
    * le mappage des entités JPA et les DTOs
    *
    * */
    BanqueResponseDto banqueToBanqueResponseDto(Banque banque);
    Banque fromBanqueRequestDto(BanqueRequestDto requestDto);

}
