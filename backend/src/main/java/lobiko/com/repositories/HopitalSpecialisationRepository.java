package lobiko.com.repositories;

import lobiko.com.entities.HopitalSpecialisation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface HopitalSpecialisationRepository extends JpaRepository<HopitalSpecialisation,Long> {
    @Query("select c from HopitalSpecialisation c where c.idSpecialite = :idSpecialite ")
    public List<HopitalSpecialisation> listeOrdreBySpecialisation(@Param("idSpecialite") Long idSpecialite);
}
