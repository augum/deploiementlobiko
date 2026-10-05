package lobiko.com.mappers;

import lobiko.com.dtos.MedecinRequestDto;
import lobiko.com.dtos.MedecinResponseDto;
import lobiko.com.entities.Medecin;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface MedecinMapper {
    /*
     * le mappage des entités JPA et les DTOs
     *
     * */
    MedecinResponseDto medecinToMedecinResponseDto(Medecin medecin);
    Medecin fromMedecinRequestDto(MedecinRequestDto medecinRequestDto);
}
