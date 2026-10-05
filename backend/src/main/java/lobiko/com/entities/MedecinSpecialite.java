package lobiko.com.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class MedecinSpecialite {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long idMedecin;
    private Long idSpecialite;
    @Transient
    private Medecin medecin;
    @Transient
    private Specialite specialisation;
}
