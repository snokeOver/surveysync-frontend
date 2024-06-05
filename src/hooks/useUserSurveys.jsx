import { useQuery } from "@tanstack/react-query";
import useSAxios from "./useSAxios";
import useAuth from "./useAuth";

const useUserSurveys = () => {
  const sAxios = useSAxios();
  const { user } = useAuth();
  const {
    data: mySurveys = [],
    refetch: mySurveysRefetch,
    error: mySurveysError,
    isPending: mySurveysPending,
  } = useQuery({
    queryKey: ["my-surveys"],
    enabled: !!user && !!user.uid,
    queryFn: async () => {
      const { data } = await sAxios.get(`/api/surveys/${user.uid}`);
      return data.surveys;
    },
  });
  return { mySurveys, mySurveysError, mySurveysPending, mySurveysRefetch };
};

export default useUserSurveys;
