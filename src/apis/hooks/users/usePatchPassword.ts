import { useMutation } from "@tanstack/react-query";
import { patchPasswordParams } from "apis/types/user";
import { patchPassword } from "apis/userAPI";

const usePatchChangePassword = () => {
  return useMutation({
    mutationFn: (params: patchPasswordParams) => patchPassword(params),
  });
};

export default usePatchChangePassword;
