import { useParams } from "react-router-dom";
import SingleResponseRow from "./SingleResponseRow";
import useGetData from "../../../hooks/useGetData";
import InitialPageStructure from "../shared/InitialPageStructure";
import TableViewStructure from "../shared/TableViewStructure";

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
      <TableViewStructure
        data={surveyResponse?.userResponses || []}
        tabCols={[
          "Email",
          "Name",
          "Vote",
          "Preferences",
          "Comment",
          "Report Status",
        ]}
        actionBtnNumbers={0}
      >
        {surveyResponse?.userResponses?.length > 0 &&
          surveyResponse?.userResponses.map((singleResponse, index) => (
            <SingleResponseRow
              index={index}
              key={singleResponse.email}
              singleResponse={singleResponse}
            />
          ))}
      </TableViewStructure>
    </InitialPageStructure>
  );
};

export default SurveyResponses;
