package lobiko.com.services;


import lobiko.com.dtos.UtilisateurRequestDto;
import lobiko.com.dtos.UtilisateurResponseDto;
import lobiko.com.entities.*;
import lobiko.com.mappers.UtilisateurMapper;
import lobiko.com.repositories.RoleRepository;
import lobiko.com.repositories.UtilisateurRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
@AllArgsConstructor
public class UtilsateurServiceImpl implements UtilsateurService {
    private UtilisateurRepository repository;
    private UtilisateurMapper mapper;
    private RoleRepository roleRepository;
    @Override
    public UtilisateurResponseDto save(UtilisateurRequestDto requestDto) {

        Utilisateur utilisateur = mapper.fromUtilisateurRequestDto(requestDto);

        if (utilisateur.getPassword() == null
                || utilisateur.getPassword().isBlank()) {
            throw new IllegalArgumentException(
                    "Le mot de passe est obligatoire. Veuillez saisir un mot de passe."
            );
        }

        Utilisateur saved = repository.save(utilisateur);
         Role role = roleRepository.findById(saved.getId_role()).get();
         saved.setRole(role);
        return mapper.toUtilisateurResponseDto(saved);
    }

    @Override
    public UtilisateurResponseDto update(Long id, UtilisateurRequestDto requestDto) {

        Utilisateur u = repository.findById(id)
                .orElseThrow(() -> new RuntimeException(
                        "Utilisateur introuvable avec l'id : " + id
                ));

        Utilisateur utilisateurFromDto =
                mapper.fromUtilisateurRequestDto(requestDto);

        u.setNom(utilisateurFromDto.getNom());
        u.setPostnom(utilisateurFromDto.getPostnom());
        u.setId_role(utilisateurFromDto.getId_role());

        // À traiter avec prudence : ne pas enregistrer un mot de passe en clair.
        if (utilisateurFromDto.getPassword() != null
                && !utilisateurFromDto.getPassword().isBlank()) {
            u.setPassword(utilisateurFromDto.getPassword());
        }

        Utilisateur utilisateurModifie = repository.save(u);
        Role role = roleRepository.findById(utilisateurModifie.getId_role()).get();
        utilisateurModifie.setRole(role);
        return mapper.toUtilisateurResponseDto(utilisateurModifie);
    }
    @Override
    public List<UtilisateurResponseDto> utilisateurList() {
        List<Utilisateur> list = repository.findAll();
        for(Utilisateur user:list){
            Role role = roleRepository.findById(user.getId_role()).get();
            user.setRole(role);
            System.out.println("+++++++++"+role.toString()+ "++++++++++++");

        }
        return list
                .stream()
                .map(user-> mapper.toUtilisateurResponseDto(user))
                .collect(Collectors.toList());
    }

    @Override
    public UtilisateurResponseDto getUtilisateur(Long id) {
        Utilisateur utilisateur = repository.findById(id).orElseThrow(()-> new RuntimeException(
                "Utilisateur introuvable avec l'id : " + id
        ));
        Role role = roleRepository.findById(utilisateur.getId_role()).get();
        utilisateur.setRole(role);
        return mapper.toUtilisateurResponseDto(utilisateur);
    }
}
