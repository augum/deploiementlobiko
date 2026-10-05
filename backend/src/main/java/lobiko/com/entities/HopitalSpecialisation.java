package lobiko.com.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity @Data @AllArgsConstructor @NoArgsConstructor
public class HopitalSpecialisation {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long idHopital;
    private Long idSpecialite;
    @Transient
    private Hopital hopital;
    @Transient
    private Specialite specialisation;
}
