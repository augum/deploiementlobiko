package lobiko.com.services;

import lobiko.com.dtos.MedecinSpecialiteRequestDto;
import lobiko.com.dtos.MedecinSpecialiteResponseDto;
import lobiko.com.entities.*;
import lobiko.com.mappers.HopitalSpecialisationMapper;
import lobiko.com.mappers.MedecinSpecialisationMapper;
import lobiko.com.repositories.*;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@AllArgsConstructor
public class MedecinSpecialiteServiceImpl implements MedecinSpecialiteService {
    private MedecinSpecialisationRepository repository;
    private MedecinSpecialisationMapper mapper;
    private MedecinRepository medecinRepository;
    private SpecialiteRepository specialiteRepository;
    @Override
    public MedecinSpecialiteResponseDto save(MedecinSpecialiteRequestDto requestDto) {
         /*
        Sauvegarde de l'entité medecinspecialisation
         */
        MedecinSpecialite medecinSpecialisation = mapper.fromMedecinSpecialiteDto(requestDto);
        MedecinSpecialite savemedecinspecialisation= repository.save(medecinSpecialisation);
        return mapper.MedecinSpecialiteToMedecinSpecialiteResponseDto(savemedecinspecialisation);
    }

    @Override
    public List<MedecinSpecialiteResponseDto> listMedecinSpecialite() {
        List<MedecinSpecialite> list = repository.findAll();
        for(MedecinSpecialite hsp:list){
            Medecin medecin = medecinRepository.findById(hsp.getIdMedecin()).get();
            Specialite specialisation =  specialiteRepository.findById(hsp.getIdSpecialite()).get();
            hsp.setSpecialisation(specialisation);
            hsp.setMedecin(medecin);

            System.out.println("+++++++++"+hsp.toString()+ "++++++++++++");

        }

        return list
                .stream()
                .map(hosp-> mapper.MedecinSpecialiteToMedecinSpecialiteResponseDto(hosp))
                .collect(Collectors.toList());
    }

    @Override
    public List<MedecinSpecialiteResponseDto> listMedecinSpecialite(Long idSpecialite) {

        //Trouver tous les objets hopitalspecialite qui ont l'id de lq specialité demandée
        List<MedecinSpecialite> list = repository.listeOrdreBySpecialisation(idSpecialite);
        /*
        pour tout objet hopitalspecialite qui se trouve dans la liste après recherche,
        recherché l'hopital par son id et la specialité par son id. Ensuite ajouter à chaque objet hopital
        specialite un hopital et une specialite
         */
        for(MedecinSpecialite hsp:list){
            //recherche de l'hopital
            Medecin medecin = medecinRepository.findById(hsp.getIdMedecin()).get();
            //recherche de la specialité
            Specialite specialisation =  specialiteRepository.findById(hsp.getIdSpecialite()).get();
            /*
             Ajout de l'hopital et de la specialité
             */
            hsp.setSpecialisation(specialisation);
            hsp.setMedecin(medecin);
        }

        /*
        On retourne un objet ResponseDto de l'hopitalSpecialité
         */
        return list
                .stream()
                .map(hosp-> mapper.MedecinSpecialiteToMedecinSpecialiteResponseDto(hosp))
                .collect(Collectors.toList());
    }
}
