package lobiko.com.services;

import lobiko.com.dtos.SpecialiteRequestDto;
import lobiko.com.dtos.SpecialiteResponseDto;
import lobiko.com.entities.Specialite;
import lobiko.com.mappers.SpecialiteMapper;
import lobiko.com.repositories.SpecialiteRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
@Transactional
public class SpecialiteServiceImpl implements SpecialiteService {
    private SpecialiteRepository  repository;
    private SpecialiteMapper mapper;
    @Override
    public SpecialiteResponseDto save(SpecialiteRequestDto requestDto) {
        Specialite specialite = mapper.toSpecialite(requestDto);
        Specialite saveSpecialisation = repository.save(specialite);
        SpecialiteResponseDto responseDto = mapper.toSpecialiteResponseDto(saveSpecialisation);
        return responseDto;
    }
    @Override
    public SpecialiteResponseDto update(Long id, SpecialiteRequestDto requestDto) {
        Specialite specialisation = repository.findById(id).get();
        Specialite speciatisationfromDto = mapper.toSpecialite(requestDto);
        specialisation.setNom(speciatisationfromDto.getNom());
        return mapper.toSpecialiteResponseDto(specialisation);
    }
    @Override
    public List<SpecialiteResponseDto> specialiteList() {
        List<Specialite> specialisations = repository.findAll();
        return specialisations.stream().map(specialisation -> mapper
                .toSpecialiteResponseDto(specialisation))
                .collect(Collectors.toList());
    }
    @Override
    public SpecialiteResponseDto getSpecialite(Long id) {
        Specialite specialisation = repository.findById(id).get();
        return mapper.toSpecialiteResponseDto(specialisation);
    }
}
