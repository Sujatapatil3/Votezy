package in.skalive.votezy.service;

import java.util.Optional;

import org.springframework.stereotype.Service;
import java.util.*;

import in.skalive.votezy.entity.Candidate;
import in.skalive.votezy.entity.ElectionResult;
import in.skalive.votezy.exception.ResourceNotFoundException;
import in.skalive.votezy.repository.CandidateRepository;
import in.skalive.votezy.repository.ElectionResultRepository;
import in.skalive.votezy.repository.VoteRepository;

@Service
public class ElectionResultService {
            private CandidateRepository  candidateRepository;
            private VoteRepository  voteRepository;
            private ElectionResultRepository electionResultRepository;
			
            public ElectionResultService(CandidateRepository candidateRepository, VoteRepository voteRepository,
					ElectionResultRepository electionResultRepoitory) {
				
				this.candidateRepository = candidateRepository;
				this.voteRepository = voteRepository;
				this.electionResultRepository = electionResultRepoitory;
			}
            
            
         public ElectionResult declareElectionResult(String electionName) {
        	     Optional<ElectionResult> existingResult=this.electionResultRepository.findByElectionName(electionName);
        	     if(existingResult.isPresent()) {
        	    	      return existingResult.get();
        	     }
			
        	     if(voteRepository.count()==0) {
        	    	    throw new IllegalStateException("Cannot declare the reult as no votes found");
        	     }
			List<Candidate>allCandidates=candidateRepository.findAllByOrderByVoteCountDesc()	;
			if(allCandidates.isEmpty()) {
				throw new ResourceNotFoundException("No candidate Available");				
			}
			Candidate winner=allCandidates.get(0);
			int totalVotes=0;
			for(Candidate candidate:allCandidates) {				
				totalVotes+=candidate.getVoteCount();
			}
			ElectionResult result=new ElectionResult();
			result.setElectionName(electionName);
			result.setWinner(winner);
			result.setTotalVotes(totalVotes);
			return electionResultRepository.save(result);
         }
           
            
            public List<ElectionResult> getAllResults(){
            	 return electionResultRepository.findAll();
            }
        
         
         
            
            
}









