package lobiko.com.dtos;

import com.fasterxml.jackson.annotation.JsonRootName;
import lobiko.com.entities.Hopital;
import lobiko.com.entities.Specialite;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @AllArgsConstructor @NoArgsConstructor
@JsonRootName(value = "items")
public class HopitalSpecialiteResponseDto {
    private Specialite specialisation;
    private Hopital hopital;
}
