package lobiko.com.services;

import lobiko.com.dtos.BanqueRequestDto;
import lobiko.com.dtos.BanqueResponseDto;
import lobiko.com.dtos.HopitalRequestDto;
import lobiko.com.dtos.HopitalResponseDto;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface BanqueService
{

    BanqueResponseDto save(BanqueRequestDto requestDto);
    BanqueResponseDto update(Long id, BanqueRequestDto requestDto);
    void modifierPhoto(Long id, MultipartFile file) throws Exception;
    byte[] getphoto(Long id) throws Exception;
    BanqueResponseDto getBanque(Long id);
    List<BanqueResponseDto> listBanque();

}
