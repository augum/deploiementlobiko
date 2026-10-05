package lobiko.com.dtos;

import com.fasterxml.jackson.annotation.JsonRootName;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @AllArgsConstructor @NoArgsConstructor
@JsonRootName(value = "banque")
public class BanqueRequestDto {
    @Schema(description = "identifiant de la banque du sang", example = "1")
    private Long id;
    @Schema(description = "Nom de la banque du sang", example = "hsj")
    private String nom;
    @Schema(description = "la longitude de la banque de sang", example = "1.09865")
    private double longitude;
    @Schema(description = "la latitude", example = "4.00")
    private double latitude;
    @Schema(description = "adresse de la banque de sang", example = "av.kikwit 1")
    private String adresse;
    @Schema(description = "Téléphone de la banque", example = "+243904168454")
    private String tel;
    @Schema(description = "email de la banque", example = "augumakuma@gmail.com")
    private String mail;
    @Schema(description = "localisation de la banque", example = "ndjili")
    private String localisation;
}
