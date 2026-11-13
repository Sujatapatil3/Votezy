package in.skalive.votezy.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ElectionResultRequestDTO {
	      @NotBlank(message="Election name Required")
         private String electionName;
          //DTO carries 4 info 1.name   2 ele votestotal    3winner id         4how many voter winner got
	      
	      
	      
	      
	      
}
