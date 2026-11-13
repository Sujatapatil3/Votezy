package in.skalive.votezy.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Entity
@Data

//@Getter
//@Setter
//@NoArgsConstructor
//@AllArgsConsructor

public class Voter {
	         @Id
	         @GeneratedValue(strategy=GenerationType.IDENTITY)
             private long id;
	         @NotBlank(message="Name is Required")
             private String name;
	         
	         @NotBlank(message="email is Required")
	         @Email(message="Invalid mail format")
             private String email;
	         
             private boolean hasVoted=false;
             @OneToOne(mappedBy="voter",cascade=CascadeType.ALL)   //caskadetype all means any change made to voter also applicable for vote.
             @JsonIgnore
             private Vote vote;
			
			
}
