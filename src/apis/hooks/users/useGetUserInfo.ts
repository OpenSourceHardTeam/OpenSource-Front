import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "apis/userAPI";

const useGetUserInfo = () => {
  return useQuery({
    queryKey: ["userInfo"],
    queryFn: getUserInfo,
    select: (res) => res.data,
  });
};

export default useGetUserInfo;
