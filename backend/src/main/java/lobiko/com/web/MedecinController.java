package lobiko.com.web;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lobiko.com.dtos.HopitalRequestDto;
import lobiko.com.dtos.HopitalResponseDto;
import lobiko.com.dtos.MedecinRequestDto;
import lobiko.com.dtos.MedecinResponseDto;
import lobiko.com.entities.Medecin;
import lobiko.com.services.MedecinService;
import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.awt.*;
import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping(path = "/api")
@CrossOrigin("*")
@Tag(name = "Medecin", description = "Gestion des medecins")
public class MedecinController {
    private MedecinService medecinService;

    @PostMapping(path = "/medecins")
    @Operation(summary = "Insertion des medecins")
    public MedecinResponseDto save(@RequestBody MedecinRequestDto medecinRequestDto) {
        return  medecinService.saveMedecin(medecinRequestDto);
    }
    @PutMapping(path = "/medecins/{id}")
    @Operation(summary = "modification des medecins")
    public MedecinResponseDto updateMedecin(@PathVariable Long id, @RequestBody MedecinRequestDto requestDto){

        return medecinService.update(id,requestDto);
    }
    /*/
     Modifie la photo du medecin
    */

    @PostMapping(path="/medecins/{id}")
    @Operation(summary = "Insertion de la photo du medecin")
    public void savephoto(@PathVariable("id") Long id,  @RequestParam("file") MultipartFile file) throws Exception{
        medecinService.modifierPhoto(id,file);
    }
    /*
    /Retourne la photo du medecin par son ID
     */
    @GetMapping(path = "/medecinsphoto/{id}",produces = MediaType.IMAGE_JPEG_VALUE)
    @Operation(summary = "Affichage de la photo du medecin")
    public byte[] getPhoto(@PathVariable("id") Long id) throws Exception{
        return medecinService.getPhoto(id);
    }
    @GetMapping(path = "/medecins")
    @Operation(summary = "Liste des medecins")
    public List<MedecinResponseDto> findAll() {
        return medecinService.getAllMedecin();
    }
    @GetMapping(path = "/medecins/{id}")
    @Operation(summary = "Affichage d'un medecin")
    public List<MedecinResponseDto >findById(@PathVariable Long id) {
        return medecinService.getAllMedecinByid(id);
    }
}
