package lobiko.com.dtos;

import com.fasterxml.jackson.annotation.JsonRootName;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @AllArgsConstructor @NoArgsConstructor
@JsonRootName(value = "specialite")
public class SpecialiteResponseDto {
    private Long id;
    private String nom;
}
