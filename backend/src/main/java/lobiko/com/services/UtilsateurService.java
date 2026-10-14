package lobiko.com.services;



import lobiko.com.dtos.UtilisateurRequestDto;
import lobiko.com.dtos.UtilisateurResponseDto;

import java.util.List;

public interface UtilsateurService {
    UtilisateurResponseDto save(UtilisateurRequestDto requestDto);
    UtilisateurResponseDto update(Long id, UtilisateurRequestDto requestDto);
    List<UtilisateurResponseDto> utilisateurList();
    UtilisateurResponseDto getUtilisateur(Long id);
}
