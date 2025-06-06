import { useQuery } from "@tanstack/react-query";
import { getAllVoteList } from "apis/voteAPI";
import { ApiResponse } from "apis/types/response";
import { getAllVoteListResponse } from "apis/types/vote";

const useGetAllVoteList = () => {
  return useQuery<ApiResponse<getAllVoteListResponse[]>>({
    queryKey: ["allVoteList"],
    queryFn: getAllVoteList,
    retry: false,
  });
};

export default useGetAllVoteList;
