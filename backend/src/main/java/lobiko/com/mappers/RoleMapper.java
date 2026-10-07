package lobiko.com.mappers;

import lobiko.com.dtos.RoleRequestDto;
import lobiko.com.dtos.RoleResponseDto;
import lobiko.com.entities.Role;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface RoleMapper {
    RoleResponseDto toRoleResponseDto(Role role);
    Role fromRoleRequestDto(RoleRequestDto requestDto);
}
