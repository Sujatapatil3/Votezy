package in.skalive.votezy.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Entity
@Data
public class ElectionResult {
	    @Id
        @GeneratedValue(strategy=GenerationType.IDENTITY)
        private long id;
	    
	    @NotBlank(message="ElectionName is Required")
	    private String electionName;
	    
	    private int totalVotes;    //total votes in election 
	                                          //votes per candidate is counted in candidate class private int voteCount=0;
	    @OneToOne
	    @JoinColumn(name="winner_id")
	    @JsonIgnore
	    private Candidate winner;        //candidate hi wiinner hoga
	    
	    @JsonProperty("winnerId")
	    public Long getWinnerId() {
	    	 return winner!=null?winner.getId():null;
	    			 
	    }
	    
	    
}
