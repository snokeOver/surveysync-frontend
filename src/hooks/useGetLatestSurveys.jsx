import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";

const useGetLatestSurveys = () => {
  const nsAxios = useAxios();
  const {
    data: latestSurveys = [],
    refetch: latestSurveysRefetch,
    error: latestSurveysError,
    isPending: latestSurveysPending,
  } = useQuery({
    queryKey: ["recent-surveys"],
    queryFn: async () => {
      const { data } = await nsAxios.get(`/api/recent-surveys`);
      return data.recentSurveys;
    },
  });
  return {
    latestSurveys,
    latestSurveysError,
    latestSurveysPending,
    latestSurveysRefetch,
  };
};

export default useGetLatestSurveys;
