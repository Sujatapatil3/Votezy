package in.skalive.votezy.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class VoteRequestDTO {                    //DTO===>>>>DATA TRANSFER OBJECT
	                                               //dto only travels data between client and server
     @NotNull(message="Voter id is required")
	 Long voterId;
	 @NotNull(message="Candidate id is required")
     Long candidateId;




}
