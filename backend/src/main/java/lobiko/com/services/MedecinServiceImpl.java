package lobiko.com.services;

import lobiko.com.dtos.MedecinRequestDto;
import lobiko.com.dtos.MedecinResponseDto;
import lobiko.com.entities.Hopital;
import lobiko.com.entities.Medecin;
import lobiko.com.entities.Specialite;
import lobiko.com.mappers.MedecinMapper;
import lobiko.com.repositories.MedecinRepository;
import lobiko.com.repositories.SpecialiteRepository;
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
public class MedecinServiceImpl implements MedecinService {
    private MedecinRepository medecinRepository;
    private SpecialiteRepository specialiteRepository;
    private MedecinMapper medecinMapper;

    @Override
    public MedecinResponseDto update(Long id, MedecinRequestDto requestDto) {
        Medecin medecin = medecinMapper.fromMedecinRequestDto(requestDto);
        Medecin getMedecin = medecinRepository.findById(id).get();
        getMedecin.setNom(medecin.getNom());
        getMedecin.setCnom(medecin.getCnom());
        getMedecin.setTel(medecin.getTel());
        getMedecin.setDescription(medecin.getDescription());
        getMedecin.setPrenom(medecin.getPrenom());
        Medecin updateMedecin = medecinRepository.save(getMedecin);
        return medecinMapper.medecinToMedecinResponseDto(updateMedecin);
    }

    @Override
    public MedecinResponseDto saveMedecin(MedecinRequestDto medecinRequestDto) {
        Medecin medecin = medecinMapper.fromMedecinRequestDto(medecinRequestDto);
        Medecin saveMedecin = medecinRepository.save(medecin);
        MedecinResponseDto ResponseDto = medecinMapper.medecinToMedecinResponseDto(saveMedecin);
        return ResponseDto;

    }

    @Override
    public List<MedecinResponseDto> getAllMedecinByid(Long idSpecialite) {
        List<Medecin > list = medecinRepository.listeMedecin(idSpecialite);

        for(Medecin medecin : list){
            Specialite specialisation = specialiteRepository.findById(medecin.getId()).get();
            medecin.setSpecialisation(specialisation);
        }
        return list
                .stream()
                .map(medecin->medecinMapper.medecinToMedecinResponseDto(medecin) )
                .collect(Collectors.toList());
    }
    @Override
    public List<MedecinResponseDto> getAllMedecin() {
        List<Medecin > list = medecinRepository.findAll();
        /*for(Medecin medecin : list){
            Specialite specialisation = specialiteRepository.findById(medecin.getId()).get();
            medecin.setSpecialisation(specialisation);
        }*/
        return list
                .stream()
                .map(medecin->medecinMapper.medecinToMedecinResponseDto(medecin) )
                .collect(Collectors.toList());
    }
// retourne l'image enregistrée à partir de l'ID
@Override
public byte[] getPhoto(Long id) throws Exception {

    String uploadDir = System.getProperty("user.dir") + "/uploads/";
    String fileName = "medecin" + id + ".jpeg";

    Path path = Paths.get(uploadDir).resolve(fileName);

    if (!Files.exists(path)) {
        throw new RuntimeException("Photo introuvable");
    }

    return Files.readAllBytes(path);
}
//modifie le medecin en ajoutant la photo à partir de son ID
@Override
public void modifierPhoto(Long id, MultipartFile file) throws Exception {

    Medecin medecin = medecinRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Medecin introuvable"));

    String fileName = "medecin" + id + ".jpeg";

    // dossier configurable
    String uploadDir = System.getProperty("user.dir") + "/uploads/";

    // créer le dossier s'il n'existe pas
    Path uploadPath = Paths.get(uploadDir);
    if (!Files.exists(uploadPath)) {
        Files.createDirectories(uploadPath);
    }

    // écrire le fichier
    Files.write(uploadPath.resolve(fileName), file.getBytes());

    medecin.setPhoto(fileName);
    medecinRepository.save(medecin);
}
}
