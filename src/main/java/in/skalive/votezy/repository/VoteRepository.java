package in.skalive.votezy.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import in.skalive.votezy.entity.Candidate;
import in.skalive.votezy.entity.Vote;

public interface VoteRepository extends JpaRepository<Vote,Long>{

}
