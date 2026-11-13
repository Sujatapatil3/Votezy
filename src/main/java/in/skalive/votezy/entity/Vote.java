package in.skalive.votezy.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import lombok.Data;

@Entity       //for mapping class to table
@Data                //it maybe possible that this will show error so if it shows error then change this data annotation with @Getters @Setter @NoArgsConstructors @AllArgsConstructor
                   //in vote and voter class
//@Getter
//@Setter
//@NoArgsConstructor
//@AllArgsConsructor
public class Vote {                //vote is parent of voter and candidate
	      @Id           //id is primary key
          @GeneratedValue(strategy=GenerationType.IDENTITY)
          private long id;
	      
	      @OneToOne                                      //one voter can add one vote
	      @JoinColumn(name="voter_id",unique=true)     //voter id is foreign key
          @JsonIgnore
	      private Voter voter;
	     
	      @ManyToOne                                    //many votes can be given to one candidate
	      @JoinColumn(name="candidate_id")
	      @JsonIgnore
          private Candidate candidate;

	      @JsonProperty("voterId")
		 public Long getVoterId() {
			 return voter!=null ? voter.getId():null;
		 }
	      @JsonProperty("candidateId")

		 public Long getCandidateId() {
			 return candidate!=null ? candidate.getId():null;
		 }
          
}
