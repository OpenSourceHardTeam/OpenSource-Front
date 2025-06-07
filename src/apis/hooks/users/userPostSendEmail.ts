import { useMutation } from "@tanstack/react-query";
import { postSendEmail } from "apis/userAPI";
import { postSendEmailParams } from "apis/types/user";

const usePostSendEmail = () => {
  return useMutation({
    mutationFn: (data: postSendEmailParams) => postSendEmail(data),
  });
};

export default usePostSendEmail;
