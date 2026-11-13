package in.skalive.votezy.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import in.skalive.votezy.entity.Candidate;
import in.skalive.votezy.entity.Voter;

public interface CandidateRepository extends JpaRepository<Candidate,Long>{
        List<Candidate> findAllByOrderByVoteCountDesc();
        
}
