package in.skalive.votezy.service;

import java.util.List;

import org.springframework.stereotype.Service;

import in.skalive.votezy.entity.Candidate;
import in.skalive.votezy.entity.Vote;
import in.skalive.votezy.exception.ResourceNotFoundException;
import in.skalive.votezy.repository.CandidateRepository;

@Service
public class CandidateService {
            private CandidateRepository candidateRepository;

			public CandidateService(CandidateRepository candidateRepository) {
				
				this.candidateRepository = candidateRepository;
			}
            /////M1 ADD Candidate
            public Candidate addCandidate(Candidate candidate) {
				return candidateRepository.save(candidate);            	             	
            }
            
            ////M2 get list of all candidte
            
            public List<Candidate>getAllCandidates(){
            	  return candidateRepository.findAll();
            }
            ///M3     get cand details 
            
            public Candidate getCandidateById(Long id) {
            	    Candidate candidate=candidateRepository.findById(id).orElse(null);
					if(candidate==null) {
						throw new ResourceNotFoundException("Candidate with is "+id+" Not Foound");
					}
					return candidate;
            }
            
            ////M4 update candidate
            
            
            public Candidate updateCandidate(Long id,Candidate updatedCandidate) {
            	   Candidate candidate=getCandidateById(id);
            	   
            	   if(updatedCandidate.getName()!=null) {
            		   candidate.setName(updatedCandidate.getName());
            	   }
            	   if(updatedCandidate.getParty()!=null) {
            		   candidate.setParty(updatedCandidate.getParty());
            	   }
            	   return candidateRepository.save(candidate);  
            }
            
            
            ///m5 delete candidate
            
            public void deleteCandidate(Long id) {
            	      Candidate candidate=getCandidateById(id);
            	      List<Vote>votes=candidate.getVote();
            	      for(Vote v:votes) {
            	    	       v.setCandidate(null);
            	      }
            	      
            	      candidate.getVote().clear();
            	      candidateRepository.delete(candidate);
            }
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
}
