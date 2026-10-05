package lobiko.com.services;

import lobiko.com.dtos.HopitalRequestDto;
import lobiko.com.dtos.HopitalResponseDto;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface HopitalService {

    HopitalResponseDto save(HopitalRequestDto requestDto);
    HopitalResponseDto update(Long id, HopitalRequestDto requestDto);
    HopitalResponseDto getHopital(Long id);
    List<HopitalResponseDto> listHopital();
    void modifierPhoto(Long id, MultipartFile file) throws Exception;
    byte[] getphoto(Long id) throws Exception;
}
