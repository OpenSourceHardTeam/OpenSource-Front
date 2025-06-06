import { useQuery } from "@tanstack/react-query";
import { getUserVoteAnswer } from "apis/voteAPI";

const useGetUserVoteAnswer = (
  voteId: number,
  options?: { enabled?: boolean }
) => {
  return useQuery({
    queryKey: ["userVoteAnswer", voteId],
    queryFn: () => getUserVoteAnswer(voteId),
    enabled: options?.enabled ?? true,
  });
};
export default useGetUserVoteAnswer;
