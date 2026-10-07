package lobiko.com.dtos;

import com.fasterxml.jackson.annotation.JsonRootName;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @AllArgsConstructor
@NoArgsConstructor
@JsonRootName(value = "role")
public class RoleResponseDto {
    private Long id;
    private String libelle;
}
