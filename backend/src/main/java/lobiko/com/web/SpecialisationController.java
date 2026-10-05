package lobiko.com.web;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lobiko.com.dtos.SpecialiteRequestDto;
import lobiko.com.dtos.SpecialiteResponseDto;
import lobiko.com.services.SpecialiteService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping(path = "/api")
@CrossOrigin("*")
@Tag(name = "Specialisation", description = "Gestion des specialites  ")
public class SpecialisationController {
    private SpecialiteService service;

    @PostMapping(path = "/specialites")
    @Operation(summary = "Insertion de specialite")
    public SpecialiteResponseDto save(@RequestBody SpecialiteRequestDto requestDto){
        return  service.save(requestDto);
    }
    @PutMapping(path = "/specialites/{id}")
    @Operation(summary = "Modification de specialite")
    public SpecialiteResponseDto update(@PathVariable Long id ,@RequestBody SpecialiteRequestDto requestDto){
        return  service.update(id,requestDto);
    }
    @GetMapping(path = "/specialites")
    @Operation(summary = "Liste de specialite")
    public List<SpecialiteResponseDto> getAll(){
        return service.specialiteList();
    }
    @GetMapping(path = "/specialites/{id}")
    @Operation(summary = "Affichage d'une specialite")
    public SpecialiteResponseDto getone(@PathVariable Long id){
       return  service.getSpecialite(id) ;
    }
}
