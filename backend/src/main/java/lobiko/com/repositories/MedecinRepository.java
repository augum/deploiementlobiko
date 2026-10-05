package lobiko.com.repositories;


import lobiko.com.entities.Medecin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MedecinRepository extends JpaRepository<Medecin, Long> {
    @Query("select c from Medecin c where c.idSpecialite = :idSpecialite ")
    public List<Medecin> listeMedecin(@Param("idSpecialite") Long idSpecialite);
}
