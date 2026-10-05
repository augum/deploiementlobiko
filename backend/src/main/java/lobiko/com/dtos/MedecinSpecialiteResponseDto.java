package lobiko.com.dtos;

import com.fasterxml.jackson.annotation.JsonRootName;
import lobiko.com.entities.Hopital;
import lobiko.com.entities.Medecin;
import lobiko.com.entities.Specialite;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @AllArgsConstructor @NoArgsConstructor
@JsonRootName(value = "items")
public class MedecinSpecialiteResponseDto {
    private Long id;
    private Specialite specialisation;
    private Medecin medecin;
}
