package lobiko.com.mappers;

import lobiko.com.dtos.UtilisateurRequestDto;
import lobiko.com.dtos.UtilisateurResponseDto;
import lobiko.com.entities.Utilisateur;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UtilisateurMapper {
    UtilisateurResponseDto toUtilisateurResponseDto(Utilisateur utilisateur);
    Utilisateur fromUtilisateurRequestDto(UtilisateurRequestDto requestDto);
}
