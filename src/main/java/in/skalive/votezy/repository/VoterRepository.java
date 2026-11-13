package in.skalive.votezy.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import in.skalive.votezy.entity.Voter;

public interface VoterRepository extends JpaRepository<Voter,Long>{
        boolean existsByEmail(String email);               //to check if voter qith same email exists or not
}
