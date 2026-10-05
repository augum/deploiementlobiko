package lobiko.com.web;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lobiko.com.dtos.BanqueRequestDto;
import lobiko.com.dtos.BanqueResponseDto;
import lobiko.com.dtos.HopitalRequestDto;
import lobiko.com.dtos.HopitalResponseDto;
import lobiko.com.entities.Banque;
import lobiko.com.services.BanqueService;
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
@Tag(name = "Banque", description = "Gestion des banques de sang")
public class BanqueController {

    private BanqueService  banqueService;


    /*
     la methode saveBanque recupère un objet de type banquerequestDto depuis la requette http
     et l'envoie au service pour le traitement
     */
    @PostMapping(path = "/banques")
    @Operation(summary = "Insertion de la banque de sang")
    public BanqueResponseDto saveBanque(@RequestBody BanqueRequestDto requestDto) {
        System.out.println("+++++++++++++++++"+requestDto+"****************************");

        return banqueService.save(requestDto);
    }
   // debut traitement photo
    /***
     *
     *  sauvegarde ^photo
     * */
    @PostMapping(path = "/banques/{id}")
    @Operation(summary = "Insertion de l'image de la banque de sang")
    public void saveBanquePicture(@PathVariable Long id,  @RequestParam("file") MultipartFile file) throws Exception {
        System.out.println("+++++++++++++++++"+"****************************");
        banqueService.modifierPhoto(id,file);
    }
    /*
    * recuperation photo
    * */
    @GetMapping(path = "/banquesphoto/{id}",produces = MediaType.IMAGE_JPEG_VALUE)
    @Operation(summary = "Affichage de l'image de la banque de sang")
   public byte[] getphoto(@PathVariable("id") Long id) throws  Exception{
      return  banqueService.getphoto(id);
   }
    @GetMapping(path = "/banques")
    @Operation(summary = "la liste des banques de sang")
    public List<BanqueResponseDto> findAllBanque(){

        return  banqueService.listBanque();
    }
    @PutMapping(path = "/banques/{id}")
    @Operation(summary = "Modification de la banque")
    public BanqueResponseDto updateBanque(@PathVariable Long id, @RequestBody BanqueRequestDto requestDto){

        return banqueService.update(id,requestDto);
    }
}
