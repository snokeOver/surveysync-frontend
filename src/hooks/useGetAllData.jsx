import { useQuery } from "@tanstack/react-query";
import useSAxios from "./useSAxios";
import useAuth from "./useAuth";

const useGetAllData = (apiRoute) => {
  const sAxios = useSAxios();
  const { user } = useAuth();

  const {
    data = [],
    refetch,
    error,
    isPending,
  } = useQuery({
    queryKey: [apiRoute],
    enabled: !!user,
    queryFn: async () => {
      const { data } = await sAxios.get(`/api/${apiRoute}`);
      return data.response;
    },
  });
  return {
    data,
    refetch,
    isPending,
    error,
  };
};

export default useGetAllData;
