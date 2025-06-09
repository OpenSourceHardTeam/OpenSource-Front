import { useMutation } from "@tanstack/react-query";
import { postAddVoteRequest } from "apis/types/vote";
import { postAddVote } from "apis/voteAPI";

const usePostAddVote = () => {
  return useMutation({
    mutationFn: (vote: postAddVoteRequest) => postAddVote(vote),
  });
};

export default usePostAddVote;
