import { Tooltip } from "react-tooltip";
import { formatDate, formatDateTime } from "../../../helper/helperFunction";
const SingleSurveyRow = ({
  singleSurvey,
  index,
  surveyStatusUpdateInitiate,
}) => {
  const { title, category, _id, status, updatedAt } = singleSurvey;

  return (
    <>
      <tr className="cursor-pointer dark:hover:bg-gray-800 hover:bg-gray-400">
        <th>{index + 1}</th>
        <td>{title}</td>
        <td>{category}</td>
        <td>{formatDateTime(updatedAt)}</td>
        <td>
          <span
            className={`${
              status === "Published" ? "bg-green-400" : "bg-yellow-400"
            } px-3 py-1 rounded-xl font-semibold text-gray-900`}
          >
            {status}
          </span>
        </td>
        <td className="update_btn_tooltip">
          <button
            onClick={() => surveyStatusUpdateInitiate(singleSurvey)}
            className="text-gray-500 transition-colors duration-200   hover:text-primary focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>
          </button>
        </td>
      </tr>
      <Tooltip
        anchorSelect=".update_btn_tooltip"
        place="bottom"
        className="z-50"
        variant="info"
      >
        <p>Update</p>
      </Tooltip>
    </>
  );
};

export default SingleSurveyRow;
