import { useNavigate } from "react-router-dom";
import SingleSurveyRow from "./SingleSurveyRow";
import useDeleteData from "../../../hooks/useDeleteData";
import InitialPageStructure from "../shared/InitialPageStructure";
import useGetData from "../../../hooks/useGetData";
import TableViewStructure from "../shared/TableViewStructure";

const MyCreatedSurveys = () => {
  const deleteSurvey = useDeleteData();

  const {
    data: mySurveys,
    isPending,
    error,
  } = useGetData({ apiRoute: "surveyor-surveys" });

  const navigate = useNavigate();

  //   Hanlde update Survey
  const handleUpdateSurvey = (currSurvey) => {
    navigate(`/dashboard/surveyor/update/${currSurvey._id}`);
  };

  // Handle the delete operation of food items from cart
  const handleDeleteSurvey = async (id) => {
    deleteSurvey(id, "Survey", "survey");
  };

  // Hanlde the view details button
  const handleViewDetails = (id) => {
    navigate(`/dashboard/surveyor/survey/${id}`);
  };

  return (
    <InitialPageStructure
      pageName="Created Surveys"
      pageTitle="All my created Surveys"
      error={error}
      isPending={isPending}
      data={mySurveys || []}
      emptyDataMsg="You didn't create any survey Yet!"
      direction={`/dashboard/surveyor/create`}
      totalName="Survey"
    >
      {/* Table section */}
      <TableViewStructure
        data={mySurveys || []}
        tabCols={["Title", "Category", "Deadline", "Responses"]}
        actionBtnNumbers={3}
      >
        {mySurveys &&
          mySurveys.map((singleSurvey, index) => (
            <SingleSurveyRow
              index={index}
              key={singleSurvey._id}
              singleSurvey={singleSurvey}
              handleDeleteSurvey={handleDeleteSurvey}
              handleUpdateSurvey={handleUpdateSurvey}
              handleViewDetails={handleViewDetails}
            />
          ))}
      </TableViewStructure>
    </InitialPageStructure>
  );
};

export default MyCreatedSurveys;
