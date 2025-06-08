import { useMutation } from "@tanstack/react-query";
import { deleteVote } from "apis/voteAPI";

const useDeleteVote = () => {
  return useMutation({
    mutationFn: (voteId: number) => deleteVote(voteId),
  });
};

export default useDeleteVote;
