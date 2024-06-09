import { Tooltip } from "react-tooltip";
import { TbListDetails } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

const CommentedSurveyRow = ({ singleSurvey, index }) => {
  const navigate = useNavigate();
  const { surveyDetails, userResponse } = singleSurvey;

  const comment = userResponse?.comment;

  return (
    <>
      <tr className="cursor-pointer dark:hover:bg-gray-800 hover:bg-gray-400 hover:scale-105 duration-500">
        <th>{index + 1}</th>
        <td>{surveyDetails.title}</td>

        <td>
          <div
            className={` bg-sky-300 px-3 py-1 rounded-xl font-semibold text-gray-900 inline-block`}
          >
            {comment}
          </div>
        </td>

        <td className="details_btn_tooltip">
          <button
            onClick={() => navigate(`/survey-details/${surveyDetails._id}`)}
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

export default CommentedSurveyRow;
