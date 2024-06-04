import Banner from "../components/home/Banner";
import LatestSurveySection from "../components/home/LatestSurveySection";
import GoToTopBtn from "../components/shared/GoToTopBtn";
import PageHelmet from "../components/shared/PageHelmet";
import { goToTop } from "../helper/goToTop";

const Home = () => {
  return (
    <>
      {goToTop()}
      <div className="w-full overflow-hidden">
        <PageHelmet pageName="Home" />
        <Banner />
        <div className="md:container mx-auto">
          <LatestSurveySection />
        </div>
        {/* <WhatMakeUsDifferent />

        <div className="md:container mx-auto">
          <AwardSection />
        </div> */}
      </div>
      <GoToTopBtn />
    </>
  );
};

export default Home;
