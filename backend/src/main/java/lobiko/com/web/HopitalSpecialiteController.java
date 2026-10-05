package lobiko.com.web;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lobiko.com.dtos.HopitalSpecialiteRequestDto;
import lobiko.com.dtos.HopitalSpecialiteResponseDto;
import lobiko.com.services.HopitalSpecialiteService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping(path = "/api")
@CrossOrigin("*")
@Tag(name = "Hopital-specialite", description = "Gestion des specialités organisées à l'hopital")
public class HopitalSpecialiteController {
    // Appel du service
    private HopitalSpecialiteService service;
    /*
     Sauvegarde d'un objet hopitalSpecialité
     */
    @PostMapping(path = "/hopitalspecialites")
    @Operation(summary = "Insertion de l'hopital-specialité")
    public HopitalSpecialiteResponseDto save(@RequestBody HopitalSpecialiteRequestDto requestDto){
       System.out.println(requestDto);
        return service.save(requestDto);
    }
    @GetMapping(path = "/hopitalspecialites")
    @Operation(summary = "Affichage de la liste des enregistrements")
    public List<HopitalSpecialiteResponseDto> getAll(){
        return  service.listHopitalSpecialite();
    }

    @GetMapping(path = "/hopitalspecialites/{id}")
    @Operation(summary = "Affichage d'un enregistrement")
    public List<HopitalSpecialiteResponseDto> getAllByspecialite(@PathVariable Long id) {
        return  service.listHopitalSpecialite(id);
    }
}
