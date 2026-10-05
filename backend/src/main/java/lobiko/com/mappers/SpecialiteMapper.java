package lobiko.com.mappers;

import lobiko.com.dtos.SpecialiteRequestDto;
import lobiko.com.dtos.SpecialiteResponseDto;
import lobiko.com.entities.Specialite;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface SpecialiteMapper {
    SpecialiteResponseDto toSpecialiteResponseDto(Specialite specialite);
    Specialite toSpecialite(SpecialiteRequestDto specialiteRequestDto);
}
