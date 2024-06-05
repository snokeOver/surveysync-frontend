import { Link, useParams } from "react-router-dom";
import useGetASurveyResponse from "../../../hooks/useGetASurveyResponse";
import Container from "../../shared/Container";
import GoToTopBtn from "../../shared/GoToTopBtn";
import PageHelmet from "../../shared/PageHelmet";
import PageTitle from "../../shared/PageTitle";
import ButtonSpinner from "../../shared/ButtonSpinner";
import SingleResponseRow from "./SingleResponseRow";

const SurveyResponses = () => {
  const { id } = useParams();

  const { surveyResponse, surveyResponseError, surveyResponsePending } =
    useGetASurveyResponse(id);
  return (
    <>
      <PageHelmet pageName="Created Surveys" />
      <Container>
        <PageTitle title="All responses about this survey" />

        <div className=" rounded-lg bg-base-100 pb-5 md:pb-10">
          {/* Handle error */}
          {surveyResponseError && (
            <div>Error: {surveyResponseError.message}</div>
          )}
          {/* handle pending time */}
          {surveyResponsePending ? (
            <ButtonSpinner />
          ) : (
            <>
              <div className="text-center flex-col">
                <div className="text-center py-2">
                  {surveyResponse?.userResponses?.length < 1 && (
                    <h1 className="text-xl lg:text-4xl font-bold py-10">
                      No one responses for you survey yet !
                    </h1>
                  )}
                </div>
                {/* heading section */}
                <div className=" flex  items-center w-[90%] mx-auto gap-x-3 my-4">
                  <h2 className="text-lg  font-medium ">Total</h2>

                  <span className="px-3 py-1 text-xs text-gray-900 bg-blue-100 rounded-full ">
                    {surveyResponse.userResponses.length}
                    <span className="ml-1"> Survey (s)</span>
                  </span>
                </div>
                {/* Table section */}
                <div className="  mx-auto">
                  {surveyResponse.userResponses.length > 0 && (
                    <div className="card w-full  shadow-2xl bg-base-100">
                      {/* Table for cart */}
                      <div className="overflow-x-auto py-7  bg-base-300">
                        <table className="table">
                          {/* head */}
                          <thead>
                            <tr className="text-left text-lg">
                              <th>#</th>
                              <th>User Email</th>
                              <th>User Name</th>
                              <th>Vote</th>
                              <th>Preferences</th>
                              <th>Comment</th>
                            </tr>
                            <tr>
                              <th colSpan="6">
                                <div className="divider -my-3"></div>
                              </th>
                            </tr>
                          </thead>

                          <tbody>
                            {surveyResponse.userResponses.map(
                              (singleResponse, index) => (
                                <SingleResponseRow
                                  index={index}
                                  key={singleResponse.email}
                                  singleResponse={singleResponse}
                                />
                              )
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </Container>
      <GoToTopBtn />
    </>
  );
};

export default SurveyResponses;
