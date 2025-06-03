import { apiPost, authApiPatch } from "./apiUtils";
import { ApiResponse } from "./types/response";
import {
  logInResponse,
  patchPasswordParams,
  postEmailExistParams,
  postLogInParams,
  postNameExistParams,
  postSendEmailParams,
  postSignUpParams,
  postValidationEmailParams,
  signUpResponse,
} from "./types/user";

export const postSignUp = async (data: postSignUpParams) => {
  return apiPost<signUpResponse, postSignUpParams>("/api/v1/user/signup", data);
};

export const postLogIn = async (data: postLogInParams) => {
  return apiPost<logInResponse, postLogInParams>("/api/v1/user/signin", data);
};

export const postValidationEmail = async (data: postValidationEmailParams) => {
  const query = `?email=${encodeURIComponent(
    data.email
  )}&authCode=${encodeURIComponent(data.authCode)}`;
  return apiPost<ApiResponse<{ success: boolean }>, undefined>(
    `/api/v1/email/validation-email${query}`,
    undefined
  );
};

export const postSendEmail = async (data: postSendEmailParams) => {
  const query = `?email=${encodeURIComponent(data.email)}`;
  return apiPost<ApiResponse<null>, null>(
    `/api/v1/email/send-email${query}`,
    null
  );
};

export const postEmailExist = async (data: postEmailExistParams) => {
  const query = `?email=${encodeURIComponent(data.email)}`;
  return apiPost<ApiResponse<null>, null>(
    `/api/v1/user/email-exist${query}`,
    undefined
  );
};

export const postNameExist = async (data: postNameExistParams) => {
  const query = `?name=${encodeURIComponent(data.name)}`;
  return apiPost<ApiResponse<null>, null>(
    `/api/v1/user/name-exist${query}`,
    undefined
  );
};

export const patchPassword = async (data: patchPasswordParams) => {
  return await authApiPatch<null, undefined, patchPasswordParams>(
    "/api/v1/user/change-password",
    undefined,
    data
  );
};
