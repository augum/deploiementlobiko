package lobiko.com.services;

import lobiko.com.dtos.BanqueRequestDto;
import lobiko.com.dtos.BanqueResponseDto;
import lobiko.com.entities.Banque;
import lobiko.com.mappers.BanqueMapper;
import lobiko.com.repositories.BanqueRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
@Transactional
public class BanqueServiceImpl implements BanqueService {
    private BanqueMapper banqueMapper;
    private BanqueRepository BanqueRepository;
    /*
    * *la methode save permet d'enregistrer une banque de sang
    * */
    @Override
    public BanqueResponseDto save(BanqueRequestDto requestDto) {
        Banque banque = banqueMapper.fromBanqueRequestDto(requestDto);
        Banque banquesave= BanqueRepository.save(banque);
        return banqueMapper.banqueToBanqueResponseDto(banquesave);
    }
   /*
    la methode update met modifie une banque de sang existant
   * */
    @Override
    public BanqueResponseDto update(Long id, BanqueRequestDto requestDto) {
        Banque banque = banqueMapper.fromBanqueRequestDto(requestDto);
        Banque getBanque = BanqueRepository.findById(id).orElse(null);
          getBanque.setMail(banque.getNom());
          getBanque.setAdresse(banque.getAdresse());
          getBanque.setMail(getBanque.getMail());
          //getBanque.setLocalisation(getBanque.getLocalisation());
          getBanque.setLatitude(banque.getLatitude());
          getBanque.setLongitude(banque.getLongitude());
          Banque updateBanque = BanqueRepository.save(getBanque);
        return banqueMapper.banqueToBanqueResponseDto(updateBanque);
    }
   // modifier le nom de l'image et enregistrer l'image dans le dossier de l'utilisateur
   @Override
   public void modifierPhoto(Long id, MultipartFile file) throws Exception {

       System.out.println("ID banque : " + id);

       if (file == null || file.isEmpty()) {
           throw new RuntimeException("Fichier image vide");
       }

       System.out.println("Nom fichier reçu : " + file.getOriginalFilename());
       System.out.println("Taille : " + file.getSize());

       Banque getBanque = BanqueRepository.findById(id)
               .orElseThrow(() -> new RuntimeException("Banque introuvable"));

       String fileName = "banque" + id + ".jpeg";

       Path uploadPath = Paths.get(
               System.getProperty("user.dir"),
               "uploads"
       );

       Files.createDirectories(uploadPath);

       Path destination = uploadPath.resolve(fileName);

       Files.write(destination, file.getBytes());

       System.out.println("Photo créée : " + destination.toAbsolutePath());

       getBanque.setLocalisation(fileName);

       BanqueRepository.save(getBanque);
   }

    @Override
    public byte[] getphoto(Long id) throws Exception {

        String uploadDir = System.getProperty("user.dir") + "/uploads/";
        String fileName = "banque" + id + ".jpeg";

        Path path = Paths.get(uploadDir).resolve(fileName);

        if (!Files.exists(path)) {
            throw new RuntimeException("Photo introuvable");
        }

        return Files.readAllBytes(path);

    }


    /*
   * Selectionne une banque de sang à partir de son identifiant
   * */
    @Override
    public BanqueResponseDto getBanque(Long id) {
        Banque banque = BanqueRepository.findById(id).orElse(null);
        return banqueMapper.banqueToBanqueResponseDto(banque);
    }
   /*
   retourne une liste des banques de sang
    */
    @Override
    public List<BanqueResponseDto> listBanque() {
        List<Banque> banques = BanqueRepository.findAll();
        return banques.stream()
                .map(banque -> banqueMapper.banqueToBanqueResponseDto(banque))
                .collect(Collectors.toList());
    }
}
