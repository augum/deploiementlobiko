package lobiko.com.dtos;

import com.fasterxml.jackson.annotation.JsonRootName;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @AllArgsConstructor @NoArgsConstructor
@JsonRootName(value = "banque")
public class BanqueResponseDto {
    private Long id;
    private String nom;
    private double longitude;
    private double latitude;
    private String adresse;
    private String tel;
    private String mail;
    private String localisation;
}
