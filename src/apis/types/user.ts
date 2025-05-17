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
