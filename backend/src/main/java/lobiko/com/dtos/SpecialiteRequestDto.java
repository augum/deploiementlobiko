package lobiko.com.dtos;

import com.fasterxml.jackson.annotation.JsonRootName;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @AllArgsConstructor @NoArgsConstructor
@JsonRootName(value = "specialite")
public class SpecialiteRequestDto {
    @Schema(description = "identifiant", example = "1")
    private Long id;
    @Schema(description = "nom", example = "generaliste")
    private String nom;
}
