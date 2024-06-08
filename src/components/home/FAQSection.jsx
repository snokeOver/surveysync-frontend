import useGetPublicData from "../../hooks/useGetPublicData";
import ButtonSpinner from "../shared/ButtonSpinner";
import Container from "../shared/Container";
import PageTitle from "../shared/PageTitle";
import SingleAccording from "../shared/cards/SingleAccording";

const FAQSection = () => {
  const {
    data: faqData,
    isPending,
    error,
  } = useGetPublicData({ apiRoute: "faq-data" });
  return (
    <Container>
      <PageTitle
        title="Frequently Asked Questions"
        subTitle="Most wanted questions might circulating in your mind"
      />
      <div className="flex flex-col gap-4 md:gap-7">
        {isPending ? (
          <ButtonSpinner />
        ) : (
          <>
            {faqData.map((data) => (
              <SingleAccording key={data._id} data={data} />
            ))}
          </>
        )}
      </div>
    </Container>
  );
};

export default FAQSection;
