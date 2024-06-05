import { useQuery } from "@tanstack/react-query";
import useSAxios from "./useSAxios";
import useAuth from "./useAuth";

const useGetUserRole = () => {
  const sAxios = useSAxios();
  const { user } = useAuth();
  const {
    data: userRole = "",
    refetch: userRoleRefetch,
    error: userRoleError,
    isPending: userRolePending,
  } = useQuery({
    queryKey: ["user-role"],
    enabled: !!user && !!user.uid,
    queryFn: async () => {
      const { data } = await sAxios.get(`/api/user-role/${user.uid}`);
      return data.response.userRole;
    },
  });
  return {
    userRole,
    userRoleError,
    userRolePending,
    userRoleRefetch,
  };
};

export default useGetUserRole;
