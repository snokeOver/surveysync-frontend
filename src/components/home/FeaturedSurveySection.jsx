import useGetPublicData from "../../hooks/useGetPublicData";
import CardSkeleton from "../shared/CardSkeleton";
import Container from "../shared/Container";
import PageTitle from "../shared/PageTitle";
import SurveyCard from "../shared/cards/SurveyCard";

const FeaturedSurveySection = () => {
  const {
    data: featuredSurveys,
    isPending,
    error,
  } = useGetPublicData({ apiRoute: "featured-surveys" });
  return (
    <Container>
      <PageTitle
        title="Featured Surveys"
        subTitle="Dive into the surveys everyone is talking about"
      />
      {/* Will make a custom error message component*/}
      {error && <div>Error: {error.message}</div>}
      {isPending ? (
        <CardSkeleton />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-10 px-5 group mt-2 md:mt-10">
          {featuredSurveys.map((survey) => (
            <SurveyCard key={survey._id} survey={survey} />
          ))}
        </div>
      )}
    </Container>
  );
};

export default FeaturedSurveySection;
