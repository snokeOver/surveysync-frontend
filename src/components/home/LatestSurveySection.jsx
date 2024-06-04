import useGetLatestSurveys from "../../hooks/useGetLatestSurveys";
import ButtonSpinner from "../shared/ButtonSpinner";
import Container from "../shared/Container";
import PageTitle from "../shared/PageTitle";
import SurveyCard from "../shared/cards/SurveyCard";

const LatestSurveySection = () => {
  const { latestSurveys, latestSurveysError, latestSurveysPending } =
    useGetLatestSurveys();

  return (
    <Container>
      <PageTitle title="Latest Surveys" />
      {/* Will make a custom error message component*/}
      {latestSurveysError && <div>Error: {latestSurveysError.message}</div>}
      {latestSurveysPending ? (
        <ButtonSpinner />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 px-5 group mt-2 md:mt-10">
          {latestSurveys.map((survey) => (
            <SurveyCard key={survey._id} survey={survey} />
          ))}
        </div>
      )}
    </Container>
  );
};

export default LatestSurveySection;