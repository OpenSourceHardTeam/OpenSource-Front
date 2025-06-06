import { useMutation } from "@tanstack/react-query";
import { postVoteRequest } from "apis/types/vote";
import { postVote } from "apis/voteAPI";

const usePostVote = () => {
  return useMutation({
    mutationFn: (data: postVoteRequest) => postVote(data),
  });
};

export default usePostVote;
