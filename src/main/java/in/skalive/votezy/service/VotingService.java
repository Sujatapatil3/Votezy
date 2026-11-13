package in.skalive.votezy.service;

import java.util.List;

import org.springframework.stereotype.Service;

import in.skalive.votezy.entity.Candidate;
import in.skalive.votezy.entity.Vote;
import in.skalive.votezy.entity.Voter;
import in.skalive.votezy.exception.ResourceNotFoundException;
import in.skalive.votezy.exception.VoteNotAllowedException;
import in.skalive.votezy.repository.CandidateRepository;
import in.skalive.votezy.repository.VoteRepository;
import in.skalive.votezy.repository.VoterRepository;
import jakarta.transaction.Transactional;

@Service
public class VotingService {
	     
          private VoteRepository voteRepository;
          private CandidateRepository candidateRepository;
          private VoterRepository voterRepository;
		  public VotingService(VoteRepository voteRepository, CandidateRepository candidateRepository,
				VoterRepository voterRepository) {
			
			this.voteRepository = voteRepository;
			this.candidateRepository = candidateRepository;
			this.voterRepository = voterRepository;
		  }
          @Transactional
          public Vote castVote(Long voterId,Long candidateId) {
			if(!voterRepository.existsById(voterId)) {
			throw new ResourceNotFoundException("Voter not Found with ID: "+voterId);   
			}
			if(!candidateRepository.existsById(candidateId)) {
				throw new ResourceNotFoundException("Candidate not Found with ID: "+candidateId);   
				}
			
			Voter voter=voterRepository.findById(voterId).get();
			if(voter.isHasVoted()) {
				throw new VoteNotAllowedException("Voter id "+voterId+ " has already casted vote.");
			}
			
			Candidate candidate=candidateRepository.findById(candidateId).get();
			Vote vote=new Vote();
			vote.setVoter(voter);
			vote.setCandidate(candidate);
//			voteRepository.save(vote);          //if gone by this in vote table it does not shows voter_id to avoid this use line 54
			
			
			candidate.setVoteCount(candidate.getVoteCount()+1);
			candidateRepository.save(candidate);
			
			voter.setVote(vote);          ///use to save vote
			voter.setHasVoted(true);
			voterRepository.save(voter);
			
			return vote;
           }
          public List<Vote> getAllVoters(){
        	     return voteRepository.findAll();
          }
      
}
