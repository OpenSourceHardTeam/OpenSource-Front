import { useMutation } from "@tanstack/react-query";
import { postValidationEmail } from "apis/userAPI";
import { postValidationEmailParams } from "apis/types/user";

const usePostEmail = () => {
  return useMutation({
    mutationFn: (data: postValidationEmailParams) => postValidationEmail(data),
  });
};

export default usePostEmail;
