import { Tooltip } from "react-tooltip";
import { TbListDetails } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

const ReportedSurveyRow = ({ singleSurvey, index }) => {
  const navigate = useNavigate();
  const { surveyId, userResponses } = singleSurvey;

  const reportStatus = userResponses[0]?.reportStatus;

  return (
    <>
      <tr className="cursor-pointer dark:hover:bg-gray-800 hover:bg-gray-400">
        <th>{index + 1}</th>
        <td>{surveyId.title}</td>
        <td>{surveyId.category}</td>

        <td>
          <span
            className={` bg-red-400 px-3 py-1 rounded-xl font-semibold text-gray-900`}
          >
            {reportStatus}
          </span>
        </td>

        <td className="details_btn_tooltip">
          <button
            onClick={() => navigate(`/survey-details/${surveyId._id}`)}
            className="text-gray-500 transition-colors duration-200   hover:text-primary focus:outline-none"
          >
            <TbListDetails className="text-xl" />
          </button>
        </td>
      </tr>
      <Tooltip
        anchorSelect=".details_btn_tooltip"
        place="bottom"
        className="z-50"
        variant="info"
      >
        <p>View Details</p>
      </Tooltip>
    </>
  );
};

export default ReportedSurveyRow;
