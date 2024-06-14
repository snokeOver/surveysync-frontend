import useGetPublicData from "../../hooks/useGetPublicData";
import Container from "../shared/Container";
import HowItWorksSkeleton from "../shared/HowItWorksSkeleton";
import PageTitle from "../shared/PageTitle";
import HowItWorksCard from "../shared/cards/HowItWorksCard";
import Marquee from "react-fast-marquee";

const HowItWorks = () => {
  const {
    data: howItWorks,
    isPending,
    error,
  } = useGetPublicData({ apiRoute: "how-it-works" });
  return (
    <Container>
      <PageTitle
        title="How It works"
        subTitle="Discover How You Can Participate and Make a Difference"
      />
      {/* Will make a custom error message component*/}
      {error && <div>Error: {error.message}</div>}
      {isPending ? (
        <HowItWorksSkeleton />
      ) : (
        <div className="text-center md:container md:mx-auto py-3 px-1 md:p-3 md:py-14">
          <Marquee>
            <div className="flex ">
              {howItWorks.map((data) => (
                <HowItWorksCard key={data._id} data={data} />
              ))}
            </div>
          </Marquee>
        </div>
      )}
    </Container>
  );
};

export default HowItWorks;
