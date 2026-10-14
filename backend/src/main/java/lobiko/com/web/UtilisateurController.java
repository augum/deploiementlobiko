package lobiko.com.web;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lobiko.com.dtos.*;
import lobiko.com.services.UtilsateurService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping(path = "/api")
@CrossOrigin("*")
@Tag(name = "Utilisateur", description = "Gestion des utilisateurs")
public class UtilisateurController {
    private UtilsateurService service;

    @PostMapping(path = "/utilisateurs")
    @Operation(summary = "Insertion de utilisateur")
    public UtilisateurResponseDto save(@RequestBody UtilisateurRequestDto requestDto){
        return service.save(requestDto);
    }
    @GetMapping(path = "/utilisateurs")
    @Operation(summary = "Liste des utilisateurs")
    public List<UtilisateurResponseDto> getAll(){

        return service.utilisateurList();
    }
    @GetMapping(path = "/utilisateurs/{id}")
    @Operation(summary = "Affichage d'un utilisateur")
    public UtilisateurResponseDto getone(@PathVariable Long id){
        return  service.getUtilisateur(id) ;
    }
    @PutMapping(path = "/utilisateurs/{id}")
    @Operation(summary = "modification de l'utilisateur")
    public UtilisateurResponseDto updateUtilisateur(@PathVariable Long id, @RequestBody UtilisateurRequestDto requestDto){

        return service.update(id,requestDto);
    }
}
