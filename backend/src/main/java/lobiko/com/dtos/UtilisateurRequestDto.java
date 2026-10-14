package lobiko.com.dtos;

import com.fasterxml.jackson.annotation.JsonRootName;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonRootName(value = "utilisateur")
public class UtilisateurRequestDto {
    private Long id;
    private String nom;
    private String postnom;
    private String prenom;
    private String login;
    private String password;
    private Long id_role;
}
