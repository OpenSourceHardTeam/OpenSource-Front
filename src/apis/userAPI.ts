import { apiPost } from "./apiUtils";
import {
  logInResponse,
  postLogInParams,
  postSignUpParams,
  signUpResponse,
} from "./types/user";

export const postSignUp = async (data: postSignUpParams) => {
  return apiPost<signUpResponse, postSignUpParams>("/api/v1/user/signup", data);
};

export const postLogIn = async (data: postLogInParams) => {
  return apiPost<logInResponse, postLogInParams>("/api/v1/user/signin", data);
};
