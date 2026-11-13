package in.skalive.votezy.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import in.skalive.votezy.entity.Candidate;
import in.skalive.votezy.entity.Vote;
import in.skalive.votezy.entity.Voter;
import in.skalive.votezy.exception.DuplicateResourceException;
import in.skalive.votezy.exception.ResourceNotFoundException;
import in.skalive.votezy.repository.CandidateRepository;
import in.skalive.votezy.repository.VoterRepository;

@Service
public class VoterService {
              private VoterRepository voterRepository;
              private CandidateRepository candidateRepository;
                           
              @Autowired
			  public VoterService(VoterRepository voterRepository, CandidateRepository candidateRepository) {
				
				this.voterRepository = voterRepository;
				this.candidateRepository = candidateRepository;
			  }
              
              ///method 1 
			  public Voter registerVoter(Voter voter){
				  if(voterRepository.existsByEmail(voter.getEmail())) {
					  throw new DuplicateResourceException("Voter with email id: "+voter.getEmail()+ "already exists");
				  }
				  
				  return voterRepository.save(voter);
			  }

			  //method 2
			  
			  public List<Voter>getAllVoters(){
				  return voterRepository.findAll();
			  }
			  
			  //method 3
			  
              public Voter getVoterById(Long id) {
            	     Voter voter=voterRepository.findById(id).orElse(null);
            	     if(voter==null) {
            	    	 throw new ResourceNotFoundException("Voter With Id "+ id + "Not found");
            	     }
            	     return voter;
              }
              
              //method 4
              
              public Voter updateVoter(Long id, Voter updatedVoter) {
            	      Voter voter=voterRepository.findById(id).orElse(null);
            	      if(voter==null) {
             	    	 throw new ResourceNotFoundException("Voter With Id "+id+ " Not found");
             	     }
            	      if(updatedVoter.getName()!=null) {
            	      voter.setName(updatedVoter.getName());
            	      }
            	      if(updatedVoter.getEmail()!=null) {
            	      voter.setEmail(updatedVoter.getEmail());
            	      }
				  return voterRepository.save(voter);
              }
              
              
              //method 5
              @Transactional
              public void deleteVoter(Long id) {
            	  Voter voter=voterRepository.findById(id).orElse(null);
        	      if(voter==null) {
         	    	 throw new ResourceNotFoundException("Cannot delete voter With Id "+id+ " as it does not exists");
         	     }
        	      
        	      Vote vote=voter.getVote();
        	      if(vote!=null) {
        	    	       Candidate candidate=vote.getCandidate();
        	    	       candidate.setVoteCount(candidate.getVoteCount()-1);
        	    	       candidateRepository.save(candidate);
        	    	   
        	      }       	      
        	      voterRepository.delete(voter);
              }
              
              
              
              
              
              
              
              
}
