import { useParams } from "react-router-dom";
import SingleResponseRow from "./SingleResponseRow";
import useGetData from "../../../hooks/useGetData";
import InitialPageStructure from "../shared/InitialPageStructure";

const SurveyResponses = () => {
  const { id } = useParams();

  const {
    data: surveyResponse,
    isPending,
    error,
  } = useGetData({ apiRoute: "survey-response", dataId: id });

  return (
    <InitialPageStructure
      pageName="Survey Response"
      pageTitle="All Responses For This Survey"
      error={error}
      isPending={isPending}
      data={surveyResponse?.userResponses || []}
      emptyDataMsg="No Responses From Users Yet!"
      totalName="Response"
    >
      {/* Table section */}
      <div className="  mx-auto">
        {surveyResponse?.userResponses?.length > 0 && (
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
                  {surveyResponse?.userResponses.map(
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
    </InitialPageStructure>
  );
};

export default SurveyResponses;
