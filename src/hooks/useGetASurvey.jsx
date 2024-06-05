import { useQuery } from "@tanstack/react-query";
import useSAxios from "./useSAxios";
import useAuth from "./useAuth";

const useGetASurvey = (id) => {
  const sAxios = useSAxios();
  const { user } = useAuth();
  const {
    data: aSurvey = {},
    refetch: aSurveyRefetch,
    error: aSurveyError,
    isPending: aSurveyPending,
  } = useQuery({
    queryKey: ["single-survey", id],
    enabled: !!id, //allow this data when user not logged in
    queryFn: async () => {
      const { data } = await sAxios.get(`/api/single-survey/${id}`, {
        params: { userId: user?.uid },
      });
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
