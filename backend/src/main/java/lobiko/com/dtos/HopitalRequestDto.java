package lobiko.com.dtos;

import com.fasterxml.jackson.annotation.JsonRootName;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @AllArgsConstructor @NoArgsConstructor
@JsonRootName(value = "hopital")
public class HopitalRequestDto {
    @Schema(description = "identifiant de l'hopital", example = "1")
    private Long id;
    @Schema(description = "Nom de l'hopital", example = "hopital de ndjili")
    private String nom;
    @Schema(description = "longitude de l'hopital", example = "1.7777")
    private double longitude;
    @Schema(description = "latitude de l'hopital", example = "0.0987")
    private double latitude;
    @Schema(description = "adresse de l'hopital", example = "av.kikwit 1")
    private String adresse;
    @Schema(description = "téléphone de l'hopital", example = "+24390876543")
    private String tel;
    @Schema(description = "email de l'hopital", example = "augumakuma@gmail.com")
    private String mail;
    @Schema(description = "localisation de l'hopital", example = "limete")
    private String localisation;
    @Schema(description = "description de l'hopital", example = "description")
    private String description;
}
