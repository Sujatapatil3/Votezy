package in.skalive.votezy.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import in.skalive.votezy.dto.ElectionResultRequestDTO;
import in.skalive.votezy.dto.ElectionResultResponseDTO;
import in.skalive.votezy.entity.ElectionResult;
import in.skalive.votezy.service.ElectionResultService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/election-result")
@CrossOrigin
public class ElectionResultController {
          private ElectionResultService electionResultService;
	
	 
          public ElectionResultController(ElectionResultService electionResultService) {
        	       this.electionResultService=electionResultService;
          }
	
          @PostMapping("/declare")
	     public ResponseEntity<ElectionResultResponseDTO> declareElectionResult(@RequestBody @Valid ElectionResultRequestDTO electionResultDTO){
	    	 ElectionResult result=electionResultService.declareElectionResult(electionResultDTO.getElectionName());
	    	 ElectionResultResponseDTO responseDTO=new ElectionResultResponseDTO();
	    	 responseDTO.setElectionName(result.getElectionName());
	    	 responseDTO.setTotalVotes(result.getTotalVotes());
	    	 responseDTO.setWinnerId(result.getWinnerId());
	    	 responseDTO.setWinnerVotes(result.getWinner().getVoteCount());
	    	 
	    	    return ResponseEntity.ok(responseDTO);
	    	 
	     }
	
	     @GetMapping
	     public ResponseEntity<List<ElectionResult>> getAllResult(){
	    	 
	    	     List <ElectionResult>results=electionResultService.getAllResults();
	    	     return ResponseEntity.ok(results);
	     }
	
	
	
	
	
	
}
