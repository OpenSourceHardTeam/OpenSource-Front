import { useQuery } from "@tanstack/react-query";
import { getVoteListParams } from "apis/types/vote";
import { getVoteList } from "apis/voteAPI";

const useVoteList = (params: getVoteListParams) => {
  return useQuery({
    queryKey: ["votesByBook", params.bookId, params.sortBy],
    queryFn: () => getVoteList(params),
  });
};

export default useVoteList;
