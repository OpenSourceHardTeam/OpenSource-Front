import { useQuery } from "@tanstack/react-query";
import { getUserVoteAnswer } from "apis/voteAPI";

const useGetUserVoteAnswer = (voteId: number) => {
  return useQuery({
    queryKey: ["userVoteAnswer", voteId],
    queryFn: () => getUserVoteAnswer(voteId),
    enabled: !!voteId,
  });
};

export default useGetUserVoteAnswer;
