import InitialPageStructure from "../shared/InitialPageStructure";
import useGetData from "../../../hooks/useGetData";
import SurveyRow from "./SurveyRow";

const ParticipatedSurveys = () => {
  const {
    data: participatedSurveys,
    isPending,
    error,
  } = useGetData({ apiRoute: "participated-surveys" });

  return (
    <InitialPageStructure
      pageName="Participated Surveys"
      pageTitle="All My Participated Surveys"
      error={error}
      isPending={isPending}
      data={participatedSurveys}
      emptyDataMsg="You didn't participated any survey yet!"
      direction={`/`}
      totalName="Participated Survey"
    >
      {/* Table section */}
      <div className="  mx-auto">
        {participatedSurveys.length > 0 && (
          <div className="card w-full  shadow-2xl bg-base-100">
            {/* Table for cart */}
            <div className="overflow-x-auto py-7  bg-base-300">
              <table className="table">
                {/* head */}
                <thead>
                  <tr className="text-left text-lg">
                    <th></th>
                    <th>Title</th>
                    <th>Vote</th>
                    <th>Preference</th>
                    <th>Comment</th>
                    <th>Actions</th>
                  </tr>
                  <tr>
                    <th colSpan="6">
                      <div className="divider -my-3"></div>
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {participatedSurveys.map((singleSurvey, index) => (
                    <SurveyRow
                      index={index}
                      key={singleSurvey._id}
                      singleSurvey={singleSurvey}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </InitialPageStructure>
  );
};

export default ParticipatedSurveys;
