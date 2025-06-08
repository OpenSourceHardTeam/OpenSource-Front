import { useMutation } from "@tanstack/react-query";
import { patchProfileParams } from "apis/types/user";
import { patchProfile } from "apis/userAPI";

const usePatchProfile = () => {
  return useMutation({
    mutationFn: (params: patchProfileParams) => patchProfile(params),
  });
};

export default usePatchProfile;
