package lobiko.com.dtos;

import com.fasterxml.jackson.annotation.JsonRootName;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @AllArgsConstructor @NoArgsConstructor
@JsonRootName(value = "items")
public class MedecinSpecialiteRequestDto {
    @Schema(description = "identifiant", example = "1")
    private Long id;
    @Schema(description = "identifiant medecin", example = "1")
    private Long idMedecin;
    @Schema(description = "identifiant specialite", example = "1")
    private Long idSpecialite;
}
