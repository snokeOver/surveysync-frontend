import { useQuery } from "@tanstack/react-query";
import useSAxios from "./useSAxios";
import useAuth from "./useAuth";

const useGetASurveyResponse = (id) => {
  const sAxios = useSAxios();
  const { user } = useAuth();
  const dummyData = {
    userResponses: [],
  };
  const {
    data: surveyResponse = {},
    refetch: surveyResponseRefetch,
    error: surveyResponseError,
    isPending: surveyResponsePending,
  } = useQuery({
    queryKey: ["survey-response"],
    enabled: !!id && !!user,
    queryFn: async () => {
      const { data } = await sAxios.get(`/api/survey-response/${id}`);
      return data.surveyResponse || dummyData;
    },
  });
  return {
    surveyResponse,
    surveyResponseError,
    surveyResponsePending,
    surveyResponseRefetch,
  };
};

export default useGetASurveyResponse;
