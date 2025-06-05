export interface postAddVoteRequest {
  bookId: number;
  title: string;
  content: string;
}

export interface getVoteListParams {
  bookId: number;
  sortBy: "createAt" | "voteCount";
}

export interface getVoteListResponse {
  voteId: number;
  bookId: number;
  title: string;
  content: string;
  agreeCount: number;
  disagreeCount: number;
  voteCount: number;
}

//투표하기
export interface postVoteRequest {
  voteId: number;
  answered: boolean;
}

export type GetUserVoteAnsweredData = boolean | null;

export interface getAllVoteListResponse {
  voteId: number;
  bookId: number;
  title: string;
  content: string;
  agreeCount: number;
  disagreeCount: number;
  voteCount: number;
}
