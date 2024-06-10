import { Tooltip } from "react-tooltip";
import { TbListDetails } from "react-icons/tb";
import { formatDateTime } from "../../../helper/helperFunction";

const SingleFeedbackRow = ({ singleFeedback, index, handleShowFeedbacks }) => {
  const { surveyId, updatedAt, adminFeedbacks } = singleFeedback;

  return (
    <>
      <tr className="cursor-pointer dark:hover:bg-gray-800 hover:bg-gray-400 hover:scale-[1.02] duration-500">
        <th>{index + 1}</th>
        <td>{surveyId.title}</td>
        <td>{formatDateTime(updatedAt)}</td>
        <td>
          <span className="bg-sky-400 text-gray-900 font-bold text-lg px-4 rounded-xl">
            {adminFeedbacks.length}
          </span>
        </td>
        <td>
          <span
            className={`${
              surveyId.status === "Published" ? "bg-green-400" : "bg-yellow-400"
            } px-3 py-1 rounded-xl font-semibold text-gray-900`}
          >
            {surveyId.status}
          </span>
        </td>

        <td className="feedback_btn_tooltip">
          <button
            onClick={() => handleShowFeedbacks(singleFeedback)}
            className="text-gray-500 transition-colors duration-200   hover:text-primary focus:outline-none"
          >
            <TbListDetails className="text-xl" />
          </button>
        </td>
      </tr>
      <Tooltip
        anchorSelect=".feedback_btn_tooltip"
        place="bottom"
        className="z-50"
        variant="info"
      >
        <p>View Feedbacks</p>
      </Tooltip>
    </>
  );
};

export default SingleFeedbackRow;
