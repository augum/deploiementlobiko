package lobiko.com.services;

import lobiko.com.dtos.RoleRequestDto;
import lobiko.com.dtos.RoleResponseDto;
import lobiko.com.entities.Role;
import lobiko.com.mappers.RoleMapper;
import lobiko.com.repositories.RoleRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;
@Service
@AllArgsConstructor
@Transactional
public class RoleServiceImpl implements RoleService {
    private RoleRepository repository;
    private RoleMapper mapper;
    @Override
    public RoleResponseDto save(RoleRequestDto requestDto) {
        Role role = mapper.fromRoleRequestDto(requestDto);
        Role saveRole= repository.save(role);
        return mapper.toRoleResponseDto(saveRole);
    }

    @Override
    public RoleResponseDto update(Long id, RoleRequestDto requestDto) {
        Role fromRoleDto = mapper.fromRoleRequestDto(requestDto);
        Role role = repository.findById(id).get();
        role.setLibelle(fromRoleDto.getLibelle());
        Role updaterole = repository.save(role);
        return mapper.toRoleResponseDto(updaterole);
    }

    @Override
    public List<RoleResponseDto> liste() {
        List<Role> roleList = repository.findAll();
        return roleList.stream()
                .map(role -> mapper.toRoleResponseDto(role))
                .collect(Collectors.toList());
    }
}
