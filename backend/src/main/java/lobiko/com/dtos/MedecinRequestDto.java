package lobiko.com.dtos;


import com.fasterxml.jackson.annotation.JsonRootName;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @AllArgsConstructor @NoArgsConstructor @JsonRootName(value = "medecin")
public class MedecinRequestDto {
    @Schema(description = "identifiant du medecin", example = "1")
    private Long id;
    @Schema(description = "nom du medecin", example = "Dr Tagize")
    private String nom;
    @Schema(description = "prenom du medecin", example = "Dr Tagize")
    private String prenom;
    @Schema(description = "hopital de travail", example = "hopital saint joseph")
    private String hopital;
    @Schema(description = "le lien de la photo", example = "profil.jpg")
    private String photo;
    @Schema(description = "cnom du medecin", example = "Cnom 23")
    private String cnom;
    @Schema(description = "téléphone du medecin", example = "+2435653473")
    private String tel;
    @Schema(description = "specialite du medecin", example = "Gynecologue")
    private String specialite;
    @Schema(description = "Présentation du medecin", example = "Medecin travaillant à l'hopital national du congo")
    private String description;
    @Schema(description = "id specialite", example = "1")
    private Long idSpecialite;

}
