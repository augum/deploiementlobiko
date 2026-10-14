package lobiko.com.dtos;

import com.fasterxml.jackson.annotation.JsonRootName;
import jakarta.persistence.Transient;
import lobiko.com.entities.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonRootName(value = "utilisateur")
public class UtilisateurResponseDto {
    private Long id;
    private String nom;
    private String postnom;
    private String prenom;
    private String login;
    private String password;
    private Long id_role;
    @Transient
    private Role role;
}
