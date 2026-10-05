package lobiko.com.services;

import lobiko.com.dtos.MedecinRequestDto;
import lobiko.com.dtos.MedecinResponseDto;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface MedecinService {

    MedecinResponseDto update(Long id, MedecinRequestDto requestDto) ;

    MedecinResponseDto saveMedecin(MedecinRequestDto medecinRequestDto);
    List<MedecinResponseDto> getAllMedecinByid(Long idSpecialite );
    List<MedecinResponseDto> getAllMedecin();
    byte[] getPhoto(Long id) throws Exception;
    void modifierPhoto(Long id, MultipartFile file) throws Exception;
}
