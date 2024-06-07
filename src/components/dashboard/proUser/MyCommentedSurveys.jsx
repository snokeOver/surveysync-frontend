import InitialPageStructure from "../shared/InitialPageStructure";
import useGetData from "../../../hooks/useGetData";
import CommentedSurveyRow from "./CommentedSurveyRow";

const MyCommentedSurveys = () => {
  const {
    data: participatedSurveys,
    isPending,
    error,
  } = useGetData({ apiRoute: "commented-surveys" });

  return (
    <InitialPageStructure
      pageName="Commented Surveys"
      pageTitle="All My Commented Surveys"
      error={error}
      isPending={isPending}
      data={participatedSurveys}
      emptyDataMsg="You didn't comment on any survey yet!"
      direction={`/`}
      totalName="Commented Survey"
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
                    <th>Comment</th>
                    <th>Actions</th>
                  </tr>
                  <tr>
                    <th colSpan="4">
                      <div className="divider -my-3"></div>
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {participatedSurveys.map((singleSurvey, index) => (
                    <CommentedSurveyRow
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

export default MyCommentedSurveys;
