import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
const SingleResponseRow = ({ singleResponse, index }) => {
  const { name, email, vote, preference, comment, reportStatus } =
    singleResponse;

  return (
    <>
      <tr className="cursor-pointer dark:hover:bg-gray-800 hover:bg-gray-400 hover:scale-[1.02] duration-500">
        <th>{index + 1}</th>
        <td className={`my_tooltip_${index}`}>{email}</td>
        <td>{name}</td>
        <td>
          <p
            className={`${
              vote === "YES"
                ? "bg-green-400"
                : vote === "NO"
                ? "bg-red-400"
                : "bg-yellow-500"
            } px-3 py-1 rounded-xl font-semibold text-gray-900 inline-block`}
          >
            {vote || "Not Voted"}
          </p>
        </td>
        <td>
          <span
            className={`${
              preference === "LIKE"
                ? "bg-green-400"
                : preference === "DISLIKE"
                ? "bg-red-400"
                : "bg-yellow-500"
            } px-3 py-1 rounded-xl font-semibold text-gray-900`}
          >
            {preference || "Neutral"}
          </span>
        </td>
        <td>
          {comment ? (
            <FaCheck className="text-green-500 text-2xl" />
          ) : (
            <RxCross2 className="text-red-400 text-2xl" />
          )}
        </td>
        <td>
          <span
            className={`${
              !reportStatus || reportStatus === "NotReported"
                ? "bg-green-400"
                : "bg-red-400"
            } px-3 py-1 rounded-xl font-semibold text-gray-900`}
          >
            {reportStatus || "Not Reported"}
          </span>
        </td>
      </tr>
    </>
  );
};

export default SingleResponseRow;
