import Banner from "../components/home/Banner";
import FAQSection from "../components/home/FAQSection";
import FeaturedSurveySection from "../components/home/FeaturedSurveySection";
import HowItWorks from "../components/home/HowItWorks";
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

          <HowItWorks />

          <FeaturedSurveySection />

          <FAQSection />
        </div>
      </div>
      <GoToTopBtn />
    </>
  );
};

export default Home;
