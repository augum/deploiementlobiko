package lobiko.com.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Medecin {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nom;
    private String prenom;
    private String hopital;
    private String photo;
    private String cnom;
    private String tel;
    private String specialite;
    private String description;
    private Long idSpecialite;
    @Transient
    private Specialite specialisation;
}
