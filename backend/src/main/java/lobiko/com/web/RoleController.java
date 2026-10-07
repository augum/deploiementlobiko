package lobiko.com.web;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lobiko.com.dtos.*;
import lobiko.com.services.RoleService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping(path = "/api")
@CrossOrigin("*")
@Tag(name = "Role", description = "Gestion des roles")
public class RoleController {
    private RoleService service;

    @PostMapping(path = "/roles")
    @Operation(summary = "Insertion d'un role")
    public RoleResponseDto save(@RequestBody RoleRequestDto requestDto){
        return service.save(requestDto);
    }

    @GetMapping(path = "/roles")
    @Operation(summary = "Liste des roles")
    public List<RoleResponseDto> findAll(){
        return  service.liste();
    }
    @PutMapping(path = "/roles/{id}")
    @Operation(summary = "Modification du role")
    public RoleResponseDto update(@PathVariable Long id , @RequestBody RoleRequestDto requestDto){
        return  service.update(id,requestDto);
    }
}
