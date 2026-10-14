package lobiko.com.repositories;

import lobiko.com.entities.Utilisateur;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UtilisateurRepository extends JpaRepository<Utilisateur, Long> {
}
