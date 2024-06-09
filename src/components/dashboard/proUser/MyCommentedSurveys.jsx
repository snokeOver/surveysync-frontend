import InitialPageStructure from "../shared/InitialPageStructure";
import useGetData from "../../../hooks/useGetData";
import CommentedSurveyRow from "./CommentedSurveyRow";
import TableViewStructure from "../shared/TableViewStructure";

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
      data={participatedSurveys || []}
      emptyDataMsg="You didn't comment on any survey yet!"
      direction={`/`}
      totalName="Commented Survey"
    >
      {/* Table section */}
      <TableViewStructure
        data={participatedSurveys || []}
        tabCols={["Title", "Comment"]}
        actionBtnNumbers={1}
      >
        {participatedSurveys &&
          participatedSurveys.map((singleSurvey, index) => (
            <CommentedSurveyRow
              index={index}
              key={singleSurvey._id}
              singleSurvey={singleSurvey}
            />
          ))}
      </TableViewStructure>
    </InitialPageStructure>
  );
};

export default MyCommentedSurveys;
