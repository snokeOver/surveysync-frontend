import { Tooltip } from "react-tooltip";
import GoToTopBtn from "../components/shared/GoToTopBtn";
import PageHelmet from "../components/shared/PageHelmet";
import { goToTop } from "../helper/goToTop";
import { useParams } from "react-router-dom";
import useGetASurvey from "../hooks/useGetASurvey";
import ButtonSpinner from "../components/shared/ButtonSpinner";
import PageTitle from "../components/shared/PageTitle";
import Container from "../components/shared/Container";
import { formatDate } from "../helper/helperFunction";
import { BiDownvote, BiUpvote } from "react-icons/bi";
import { SlDislike, SlLike } from "react-icons/sl";
import { AiOutlineMessage } from "react-icons/ai";
import PrimaryButton from "../components/shared/PrimaryButton";
import { FaRegMessage } from "react-icons/fa6";

const SurveyDetails = () => {
  const { id } = useParams();
  const { aSurvey, aSurveyError, aSurveyPending, aSurveyRefetch } =
    useGetASurvey(id);

  if (aSurveyPending) return <ButtonSpinner />;
  return (
    <>
      {goToTop()}
      <PageHelmet pageName="Survey Details" />
      <Container>
        <PageTitle title="Detailed Survey Information" />
        {aSurveyError && <div>Error: {aSurveyError.message}</div>}
        {aSurveyPending ? (
          <ButtonSpinner />
        ) : (
          <div className="md:container mx-2 bg-base-100 md:mx-auto">
            <div className="card card-compact w-full  px-4 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:p-8">
                <div className="flex-grow ">
                  <div>
                    <h2 className="card-title md:text-2xl text-primary ">
                      {aSurvey?.title}
                    </h2>
                  </div>

                  {/* Description part */}

                  <div className="my-4">
                    <span className="font-extrabold text-lg mr-2">
                      Description:
                    </span>
                    <br />
                    <p className="text-justify">{aSurvey?.description}</p>
                  </div>

                  {/* Category part */}
                  <div className="flex gap-2 items-center mt-7">
                    <h2 className="font-extrabold text-lg mr-2">Category:</h2>
                    <h5 className="text-primary ">{aSurvey?.category}</h5>
                  </div>
                </div>

                <div className="card-body text-left w-full">
                  {/* Deadline Prt */}
                  <div className="flex justify-center">
                    <h5 className=" px-7 py-1 bg-primary text-gray-800 font-semibold rounded-xl inline-block">
                      Deadline: {formatDate(aSurvey?.deadline)}
                    </h5>
                  </div>

                  {/* Vote section */}
                  <div className="grid grid-cols-2 gap-1 text-lg my-5">
                    <button className="flex gap-2 rounded-md bg-gray-200 dark:bg-gray-900 justify-center items-center   hover:bg-green-200  hover:text-gray-900 yes_btn_tooltip">
                      <span className="font-semibold text-green-700">
                        {aSurvey?.yesCount}
                      </span>
                      <BiUpvote className="text-xl" />
                      YES
                    </button>
                    <button className="flex gap-2 rounded-md bg-gray-100 dark:bg-gray-700 justify-center items-center hover:bg-yellow-100 hover:text-gray-900 no_btn_tooltip">
                      <span className="font-semibold text-red-700">
                        {aSurvey?.noCount}
                      </span>
                      <BiDownvote className="text-xl" />
                      NO
                    </button>
                  </div>

                  {/* Like-Dislike-Comment section */}

                  {/* Like Part */}
                  <div className="grid grid-cols-3 gap-1 text-lg border-y border-y-gray-200 dark:border-gray-600 py-2">
                    <button className="flex gap-2 rounded-md   justify-center items-center   dark:hover:bg-gray-700 hover:bg-gray-200  dark:hover:text-gray-200 like_btn_tooltip">
                      <span className="font-semibold">{aSurvey?.yesCount}</span>
                      <SlLike className="text-xl" />
                    </button>

                    {/* Comment Part */}
                    <button className="flex gap-2 rounded-md  justify-center items-center dark:hover:bg-gray-700 hover:bg-gray-200  dark:hover:text-gray-200 comment_btn_tooltip">
                      <span className="font-semibold">
                        {aSurvey?.commentCount}
                      </span>
                      <AiOutlineMessage className="text-xl" />
                    </button>

                    {/* DisLike Part */}
                    <button className="flex gap-2 rounded-md  justify-center items-center dark:hover:bg-gray-700 hover:bg-gray-200  dark:hover:text-gray-200 dislike_btn_tooltip">
                      <span className="font-semibold">{aSurvey?.noCount}</span>
                      <SlDislike className="text-xl" />
                    </button>
                  </div>

                  <div className="flex gap-10 w-[90%] mx-auto mt-8 justify-center">
                    <PrimaryButton
                      text="Add Your Comment"
                      icon={FaRegMessage}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Container>
      <Tooltip
        anchorSelect=".yes_btn_tooltip"
        place="bottom"
        className="z-50"
        variant="info"
      >
        <p>Vote for 'YES'</p>
      </Tooltip>
      <Tooltip
        anchorSelect=".no_btn_tooltip"
        place="bottom"
        className="z-50"
        variant="info"
      >
        <p>Vote for 'NO'</p>
      </Tooltip>
      <Tooltip
        anchorSelect=".like_btn_tooltip"
        place="bottom"
        className="z-50"
        variant="info"
      >
        <p>'LIKE' this survey</p>
      </Tooltip>
      <Tooltip
        anchorSelect=".dislike_btn_tooltip"
        place="bottom"
        className="z-50"
        variant="info"
      >
        <p>'DISLIKE' this survey</p>
      </Tooltip>
      <Tooltip
        anchorSelect=".comment_btn_tooltip"
        place="bottom"
        className="z-50"
        variant="info"
      >
        <p>'COMMENT' on this survey</p>
      </Tooltip>
      <GoToTopBtn />
    </>
  );
};

export default SurveyDetails;
