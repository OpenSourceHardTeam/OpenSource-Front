import { useMutation } from "@tanstack/react-query";
import { postEmailExistParams } from "apis/types/user";
import { postEmailExist } from "apis/userAPI";

const usePostEmailExist = () => {
  return useMutation({
    mutationFn: (data: postEmailExistParams) => postEmailExist(data),
  });
};

export default usePostEmailExist;
