import { BsFillEyeFill } from "react-icons/bs";

import { GiVote } from "react-icons/gi";
import { PiUsersFour } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

const SurveyCard = ({ survey }) => {
  const navigate = useNavigate();
  const {
    _id,
    title,
    description,
    yesCount,
    noCount,
    likeCount,
    disLikeCount,
  } = survey;

  const wordLimit = 15;

  // Trancate the description
  const truncateDescription = (description, wordLimit) => {
    const words = description.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + " . . . ";
    }
    return description;
  };

  return (
    <div className="card card-compact bg-base-100 rounded-xl border dark:border-gray-500 border-gray-300 shadow-xl">
      <div className="card-body">
        <div className=" flex-grow">
          <h2 className="card-title text-lg text-primary ">{title}</h2>
        </div>
        <div className="">
          <p className="text-justify">
            {truncateDescription(description, wordLimit)}
            <button
              onClick={() => navigate(`survey-details/${_id}`)}
              className="px-2 border rounded-lg text-xs border-primary  hover:bg-primary hover:text-gray-900"
            >
              Show Details
            </button>
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 my-5">
          {/* Total Vote part */}
          <div className="flex gap-2 py-2 items-center flex-col border rounded-md dark:border-gray-700 border-gray-200 ">
            <GiVote className="text-3xl" />
            <h2 className="font-extrabold text-lg">Vote:</h2>
            <h4 className="text-primary text-lg">{yesCount + noCount}</h4>
          </div>

          {/* Total Vote part */}
          <div className="flex gap-2 py-2 items-center flex-col border rounded-md dark:border-gray-700 border-gray-200 ">
            <PiUsersFour className="text-3xl" />
            <h2 className="font-extrabold text-lg">Participants</h2>
            <h4 className="text-primary text-lg">
              {yesCount + noCount + likeCount + disLikeCount}
            </h4>
          </div>
        </div>

        <div className="card-actions justify-end mt-auto">
          <button
            onClick={() => navigate(`survey-details/${_id}`)}
            className="btn btn-primary btn-outline py-1 my-3 rounded-md w-full flex items-center justify-center"
          >
            <BsFillEyeFill className="text-xl" />
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default SurveyCard;
