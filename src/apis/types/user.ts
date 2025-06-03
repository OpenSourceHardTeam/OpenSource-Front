export interface postSignUpParams {
  name: string;
  email: string;
  password: string;
}

export interface signUpResponse {
  id: number;
  name: string;
  email: string;
}

export interface postNameExistParams {
  name: string;
}

export interface postLogInParams {
  email: string;
  password: string;
}

export interface logInResponse {
  userId: number;
  accessToken: string;
}

export interface postValidationEmailParams {
  email: string;
  authCode: string;
}

export interface validationEmailResponse {
  success: boolean;
  message: string;
}

export interface postSendEmailParams {
  email: string;
}

export interface postEmailExistParams {
  email: string;
}

export interface patchPasswordParams {
  newPassword: string;
}
