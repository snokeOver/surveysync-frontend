import { useQuery } from "@tanstack/react-query";
import useSAxios from "./useSAxios";

const useGetASurveyResponse = (uid) => {
  const sAxios = useSAxios();
  const {
    data: surveyResponse = [],
    refetch: surveyResponseRefetch,
    error: surveyResponseError,
    isPending: surveyResponsePending,
  } = useQuery({
    queryKey: ["survey-response", uid],
    enabled: !!uid,
    queryFn: async () => {
      const { data } = await sAxios.get(`/api/survey-response/${uid}`);
      return data.surveys;
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
