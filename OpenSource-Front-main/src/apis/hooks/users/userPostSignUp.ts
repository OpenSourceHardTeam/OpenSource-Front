import { useMutation } from "@tanstack/react-query";
import { postSignUp } from "apis/userAPI";
import { postSignUpParams } from "apis/types/user";

const usePostSignUp = () => {
  return useMutation({
    mutationFn: (data: postSignUpParams) => postSignUp(data),
  });
};

export default usePostSignUp;
