import { BsArrowRight } from "react-icons/bs";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { formatDateTime } from "../../../helper/helperFunction";

const SingleFeedback = ({ adminFeedback, index }) => {
  const { createdAt, feedback, status } = adminFeedback;
  return (
    <section className="border dark:border-gray-700 border-gray-300 pt-2 pb-4 px-4 bg-gray-700 rounded-lg">
      <div className="text-sm flex flex-col md:flex-row gap-2 text-gray-800 font-semibold">
        <h4 className="">
          <span className="dark:text-gray-400">Feedback #{index + 1}</span>
          <span className=" bg-sky-500 px-2 rounded-sm mx-4">
            {formatDateTime(createdAt)}
          </span>
        </h4>

        <h4 className="flex gap-3 items-center">
          {status !== "Published" ? (
            <>
              <span className="bg-green-600 px-2 rounded-sm">Published</span>
              <BsArrowRight className="text-gray-300 " />
              <span className="bg-yellow-600 px-2 rounded-sm">Unpublished</span>
            </>
          ) : (
            <>
              <span className="bg-yellow-600 px-2 rounded-sm">Unpublished</span>
              <BsArrowRight className="text-gray-300 " />
              <span className="bg-green-600 px-2 rounded-sm">Published</span>
            </>
          )}
        </h4>
      </div>
      <div className="mt-2">
        <h3>
          <span className="inline-block">
            <MdOutlineKeyboardDoubleArrowRight />
          </span>
          <span className="ml-3">{feedback}</span>
        </h3>
      </div>
    </section>
  );
};

export default SingleFeedback;
