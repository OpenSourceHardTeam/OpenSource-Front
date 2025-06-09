import { useMutation } from "@tanstack/react-query";
import { postNameExistParams } from "apis/types/user";
import { postNameExist } from "apis/userAPI";

const usePostNameExist = () => {
  return useMutation({
    mutationFn: (data: postNameExistParams) => postNameExist(data),
  });
};

export default usePostNameExist;
