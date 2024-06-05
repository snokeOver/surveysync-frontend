import { useQuery } from "@tanstack/react-query";
import useSAxios from "./useSAxios";
import useAuth from "./useAuth";

const useGetUsersASurveyResponse = (id) => {
  const sAxios = useSAxios();
  const { user } = useAuth();
  const {
    data: aUserSurveyResponse = {},
    refetch: aUserSurveyResponseRefetch,
    error: aUserSurveyResponseError,
    isPending: aUserSurveyResponsePending,
  } = useQuery({
    queryKey: ["user-survey-response"],
    enabled: !!id && !!user?.uid,
    queryFn: async () => {
      const { data } = await sAxios.get(`/api/user-survey-response/${id}`, {
        params: { userId: user?.uid },
      });
      return data.surveyResponse;
    },
  });
  return {
    aUserSurveyResponse,
    aUserSurveyResponseError,
    aUserSurveyResponsePending,
    aUserSurveyResponseRefetch,
  };
};

export default useGetUsersASurveyResponse;
