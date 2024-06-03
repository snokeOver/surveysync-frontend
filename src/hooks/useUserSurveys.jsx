import { useQuery } from "@tanstack/react-query";
import useSAxios from "./useSAxios";

const useUserSurveys = (uid) => {
  const sAxios = useSAxios();
  const {
    data: mySurveys = [],
    refetch: mySurveysRefetch,
    error: mySurveysError,
    isPending: mySurveysPending,
  } = useQuery({
    queryKey: ["my-surveys", uid],
    enabled: !!uid,
    queryFn: async () => {
      const { data } = await sAxios.get(`/api/surveys/${uid}`);
      return data.surveys;
    },
  });
  return { mySurveys, mySurveysError, mySurveysPending, mySurveysRefetch };
};

export default useUserSurveys;
