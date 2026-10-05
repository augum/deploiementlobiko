package lobiko.com.repositories;

import lobiko.com.entities.HopitalSpecialisation;
import lobiko.com.entities.MedecinSpecialite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MedecinSpecialisationRepository extends JpaRepository<MedecinSpecialite,Long> {
    @Query("select c from MedecinSpecialite c where c.idSpecialite = :idSpecialite ")
    public List<MedecinSpecialite> listeOrdreBySpecialisation(@Param("idSpecialite") Long idSpecialite);
}
