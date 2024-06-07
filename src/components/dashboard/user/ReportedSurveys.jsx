import InitialPageStructure from "../shared/InitialPageStructure";
import useGetData from "../../../hooks/useGetData";
import ReportedSurveyRow from "./ReportedSurveyRow";

const ReportedSurveys = () => {
  const {
    data: participatedSurveys,
    isPending,
    error,
  } = useGetData({ apiRoute: "reported-surveys" });

  return (
    <InitialPageStructure
      pageName="Reported Surveys"
      pageTitle="All My Reported Surveys"
      error={error}
      isPending={isPending}
      data={participatedSurveys}
      emptyDataMsg="You didn't report any survey yet!"
      direction={`/`}
      totalName="Reported Survey"
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
                    <th>Category</th>
                    <th>Report</th>
                    <th>Actions</th>
                  </tr>
                  <tr>
                    <th colSpan="5">
                      <div className="divider -my-3"></div>
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {participatedSurveys.map((singleSurvey, index) => (
                    <ReportedSurveyRow
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

export default ReportedSurveys;
