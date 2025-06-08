import { authApiDelete, authApiGet, authApiPost } from "./apiUtils";
import { ApiResponse } from "./types/response";

import {
  getAllVoteListResponse,
  getVoteListParams,
  getVoteListResponse,
  postAddVoteRequest,
  postVoteRequest,
  UserVoteAnswer,
} from "./types/vote";

export const postAddVote = async (data: postAddVoteRequest) => {
  return await authApiPost<null, postAddVoteRequest, undefined>(
    "/api/v1/vote/add-vote",
    data,
    undefined
  );
};

export const getVoteList = async (params: getVoteListParams) => {
  return await authApiGet<getVoteListResponse[], getVoteListParams>(
    "/api/v1/vote/votes/book",
    params
  );
};

export const postVote = async (data: postVoteRequest) => {
  return await authApiPost<null, postVoteRequest, undefined>(
    "/api/v1/vote/vote",
    data,
    undefined
  );
};

export const getAllVoteList = async (): Promise<
  ApiResponse<getAllVoteListResponse[]>
> => {
  return await authApiGet<getAllVoteListResponse[], { sortBy: string }>(
    "/api/v1/vote/votes",
    { sortBy: "voteCount" }
  );
};

export const getUserVoteAnswer = async (
  voteId: number
): Promise<ApiResponse<UserVoteAnswer>> => {
  return await authApiGet<UserVoteAnswer, { voteId: number }>(
    "/api/v1/vote/user-answered",
    { voteId }
  );
};

export const deleteVote = async (
  voteId: number
): Promise<ApiResponse<unknown>> => {
  return await authApiDelete<unknown, { voteId: number }>(
    "/api/v1/vote/delete-vote",
    { voteId }
  );
};
