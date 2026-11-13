package in.skalive.votezy.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VoteResponseDTO {              //DTO===>>>>DATA TRANSFER OBJECT
										   //dto only travels data between client and server
         private String message;
         private boolean sucess;
         private Long voterId;
         private Long candidateId;
}
