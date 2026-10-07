package lobiko.com.services;

import lobiko.com.dtos.RoleRequestDto;
import lobiko.com.dtos.RoleResponseDto;

import java.util.List;

public interface RoleService {
    RoleResponseDto save(RoleRequestDto requestDto);
    RoleResponseDto update(Long id, RoleRequestDto requestDto);
    List<RoleResponseDto> liste();
}
