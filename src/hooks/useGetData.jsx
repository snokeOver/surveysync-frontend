import { useQuery } from "@tanstack/react-query";
import useSAxios from "./useSAxios";
import useAuth from "./useAuth";

const useGetData = ({ apiRoute, dataId = "", cacheTime = 2 * 60 * 1000 }) => {
  const sAxios = useSAxios();
  const { user } = useAuth();

  const {
    data = [],
    refetch,
    error,
    isPending,
  } = useQuery({
    queryKey: [apiRoute],
    enabled: !!user && !!user.uid,
    retry: 3,
    cacheTime,
    queryFn: async () => {
      const { data } = await sAxios.get(
        `/api/${apiRoute}/${user.uid}/?dataId=${dataId}`
      );
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

export default useGetData;
