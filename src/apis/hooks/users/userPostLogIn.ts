import { useMutation } from "@tanstack/react-query";
import { postLogIn } from "apis/userAPI";
import { postLogInParams } from "apis/types/user";

const usePostLogIn = () => {
  return useMutation({
    mutationFn: (data: postLogInParams) => postLogIn(data),
  });
};

export default usePostLogIn;
