import { useQuery } from "@tanstack/react-query";
import { getUserVoteAnswered } from "apis/voteAPI";
import { ApiResponse } from "apis/types/response";
import { GetUserVoteAnsweredData } from "apis/types/vote";

interface UseGetUserVoteAnsweredOptions {
  onSuccess?: (data: ApiResponse<GetUserVoteAnsweredData>) => void;
  onError?: (error: unknown) => void;
}

const useGetUserVoteAnswered = (
  voteId: number,
  options?: UseGetUserVoteAnsweredOptions
) => {
  return useQuery<ApiResponse<GetUserVoteAnsweredData>>({
    queryKey: ["userVoteAnswered", voteId],
    queryFn: () => getUserVoteAnswered(voteId),
    enabled: !!voteId,
    retry: false,
    ...options,
  });
};

export default useGetUserVoteAnswered;
