import { useQuery } from "@tanstack/react-query";
import useSAxios from "./useSAxios";

const useGetASurvey = (id) => {
  const sAxios = useSAxios();
  const {
    data: aSurvey = {},
    refetch: aSurveyRefetch,
    error: aSurveyError,
    isPending: aSurveyPending,
  } = useQuery({
    queryKey: ["single-survey", id],
    enabled: !!id,
    queryFn: async () => {
      const { data } = await sAxios.get(`/api/single-survey/${id}`);
      return data.surveyDetail;
    },
  });
  return {
    aSurvey,
    aSurveyError,
    aSurveyPending,
    aSurveyRefetch,
  };
};

export default useGetASurvey;
