package lobiko.com.dtos;

import com.fasterxml.jackson.annotation.JsonRootName;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @AllArgsConstructor @NoArgsConstructor
@JsonRootName(value = "items")
public class HopitalSpecialiteRequestDto {
    @Schema(description = "identifiant", example = "1")
    private Long id;
    @Schema(description = "identifiant de l'hopital", example = "1")
    private Long idHopital;
    @Schema(description = "identifiant de la specialité ", example = "1")
    private Long idSpecialite;
}
