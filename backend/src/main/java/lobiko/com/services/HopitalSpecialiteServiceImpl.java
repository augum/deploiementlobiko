package lobiko.com.services;

import lobiko.com.dtos.HopitalSpecialiteRequestDto;
import lobiko.com.dtos.HopitalSpecialiteResponseDto;
import lobiko.com.entities.Hopital;
import lobiko.com.entities.HopitalSpecialisation;
import lobiko.com.entities.Specialite;
import lobiko.com.mappers.HopitalSpecialisationMapper;
import lobiko.com.repositories.HopitalRepository;
import lobiko.com.repositories.HopitalSpecialisationRepository;
import lobiko.com.repositories.SpecialiteRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@AllArgsConstructor
public class HopitalSpecialiteServiceImpl implements HopitalSpecialiteService {
    private HopitalSpecialisationRepository repository;
    private HopitalSpecialisationMapper mapper;
    private HopitalRepository hopitalRepository;
    private SpecialiteRepository specialiteRepository;


    @Override
    public HopitalSpecialiteResponseDto save(HopitalSpecialiteRequestDto requestDto) {
        /*
        Sauvegarde de l'entité hopitalspecialisation
         */
        HopitalSpecialisation hopitalSpecialisation = mapper.fromHopitalSpecialiteDto(requestDto);
        HopitalSpecialisation savehopitalspecialisation= repository.save(hopitalSpecialisation);
        return mapper.HopitalSpecialiteToHopitalSpecialiteResponseDto(savehopitalspecialisation);
    }

    @Override
    public List<HopitalSpecialiteResponseDto> listHopitalSpecialite() {
        List<HopitalSpecialisation> list = repository.findAll();
       for(HopitalSpecialisation hsp:list){
            Hopital hopital = hopitalRepository.findById(hsp.getIdHopital()).get();
            Specialite specialisation =  specialiteRepository.findById(hsp.getIdSpecialite()).get();
           System.out.println("**********"+ specialisation.toString()+"********************************");
            hsp.setSpecialisation(specialisation);
            hsp.setHopital(hopital);

           System.out.println(hsp.toString());

        }

        return list
                .stream()
                .map(hosp-> mapper.HopitalSpecialiteToHopitalSpecialiteResponseDto(hosp))
                .collect(Collectors.toList());
    }

    @Override
    public List<HopitalSpecialiteResponseDto> listHopitalSpecialite(Long idSpecialite) {
        //Trouver tous les objets hopitalspecialite qui ont l'id de lq specialité demandée
        List<HopitalSpecialisation> list = repository.listeOrdreBySpecialisation(idSpecialite);
        /*
        pour tout objet hopitalspecialite qui se trouve dans la liste après recherche,
        recherché l'hopital par son id et la specialité par son id. Ensuite ajouter à chaque objet hopital
        specialite un hopital et une specialite
         */
        for(HopitalSpecialisation hsp:list){
            //recherche de l'hopital
            Hopital hopital = hopitalRepository.findById(hsp.getIdHopital()).get();
            //recherche de la specialité
            Specialite specialisation =  specialiteRepository.findById(hsp.getIdSpecialite()).get();
            /*
             Ajout de l'hopital et de la specialité
             */
            hsp.setSpecialisation(specialisation);
            hsp.setHopital(hopital);
        }
        /*
        On retourne un objet ResponseDto de l'hopitalSpecialité
         */
        return list
                .stream()
                .map(hosp-> mapper.HopitalSpecialiteToHopitalSpecialiteResponseDto(hosp))
                .collect(Collectors.toList());
    }
}
