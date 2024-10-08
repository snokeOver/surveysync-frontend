import { Tooltip } from "react-tooltip";
import { useNavigate, useParams } from "react-router-dom";
import { formatDate } from "../helper/helperFunction";
import { BiDownvote, BiUpvote } from "react-icons/bi";
import { SlDislike, SlLike } from "react-icons/sl";
import { LuFlag } from "react-icons/lu";
import { FaRegMessage } from "react-icons/fa6";
import useUpdateData from "../hooks/useUpdateData";
import useAuth from "../hooks/useAuth";
import useSweetAlert from "../hooks/useSweetAlert";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import useData from "../hooks/useData";
import ActionButton from "../components/shared/ActionButton";

import useGetData from "../hooks/useGetData";
import InitialPageStructure from "../components/dashboard/shared/InitialPageStructure";
import useGetPublicData from "../hooks/useGetPublicData";
import { proUserCommentSchema } from "../helper/formValidation";
import { GiVote } from "react-icons/gi";
// import from "../helper/formValidation.js"

const SurveyDetails = () => {
  const { user, userDetails } = useAuth(); //Update this with userInfo from useAuth
  const { userRole } = userDetails;
  const { setActnBtnLoading, setToastMsg } = useData();
  const { id } = useParams();
  const makeAlert = useSweetAlert();
  const navigate = useNavigate();

  const {
    data: aUserSurveyResponse,
    isPending: aUserSurveyResponseError,
    error: aUserSurveyResponsePending,
  } = useGetData({
    apiRoute: "user-survey-response",
    dataId: id,
  });

  const {
    data: aSurvey,
    isPending,
    error,
  } = useGetPublicData({ apiRoute: "single-survey", dataId: id });

  const updateSurveyResponse = useUpdateData();

  const [openCommentSection, setOpenCommentSection] = useState(false);
  const [currentVote, setCurrentVote] = useState("");

  // handle the vote Button
  const handleVoteBtn = (selectedVote) => {
    if (
      aUserSurveyResponse?.vote === "YES" ||
      aUserSurveyResponse?.vote === "NO"
    )
      return setToastMsg("err You Already Submitted Vote !");
    console.log(currentVote);
    if (currentVote === "YES" && selectedVote === "NO") setCurrentVote("NO");
    else if (currentVote === "NO" && selectedVote === "YES")
      setCurrentVote("YES");
    else if (currentVote === "YES" || currentVote === "NO") setCurrentVote("");
    else setCurrentVote(selectedVote);
  };

  // Handle vote(YES/NO) update
  const handleUpdateVote = async () => {
    if (currentVote !== "YES" && currentVote !== "NO") {
      return setToastMsg("err Select any option to submit 'Vote'");
    }
    // first check the condition to VOTE
    if (user === null) {
      const response = await makeAlert(
        "Go to Login page",
        "Login to 'VOTE' on this survey !"
      );
      if (response.isConfirmed) {
        navigate("/login");
      }
      return;
    }

    // Start the Update VOTE sequence
    const payload = {
      vote: currentVote,
      surveyId: id,
      userId: user?.uid,
      name: user?.displayName || "",
      email: user.email || "",
    };

    // id, name, apiName, payload, skipModal, querryToInvalid
    await updateSurveyResponse(
      id,
      "VOTE",
      "survey-response",
      payload,
      "noSkip",
      ["single-survey"]
    );
  };

  // Handle Preference(LIKE/DISLIKE) update
  const handlePreferenceUpdate = async (preference) => {
    // first check the condition to update user preferences
    if (user === null) {
      const response = await makeAlert(
        "Go to Login page",
        `Login to '${preference}' this survey !`
      );
      if (response.isConfirmed) {
        navigate("/login");
      }
      return;
    }

    // Start the Update preference sequence
    const payload = {
      preference,
      surveyId: id,
      userId: user?.uid,
      name: user?.displayName || "",
      email: user.email || "",
    };

    // id, name, apiName, payload, skipModal, querryToInvalid
    await updateSurveyResponse(
      id,
      "PREFERENCE",
      "survey-response",
      payload,
      "skip",
      ["single-survey"]
    );
  };

  // Handle Report(Reported/NotReported) update
  const handleUpdateReport = async () => {
    // first check the condition to update user preferences
    if (user === null) {
      const response = await makeAlert(
        "Go to Login page",
        `Login to change this field !`
      );
      if (response.isConfirmed) {
        navigate("/login");
      }
      return;
    }

    // Start the Update report Status sequence
    const currReportStatus =
      aUserSurveyResponse?.reportStatus === "Reported"
        ? "NotReported"
        : "Reported";
    const payload = {
      reportStatus: currReportStatus,
      surveyId: id,
      userId: user?.uid,
      name: user?.displayName || "",
      email: user.email || "",
    };

    // id, name, apiName, payload, skipModal, querryToInvalid
    await updateSurveyResponse(
      id,
      "Report Status",
      "survey-response",
      payload,
      "skip",
      ["single-survey"]
    );
  };

  // Handle comment update for only pro-user
  const handleCommentUpdate = async () => {
    if (openCommentSection) {
      return setOpenCommentSection((currValue) => !currValue);
    }

    // first check the condition to add comment
    if (user === null) {
      const response = await makeAlert(
        "Go to Login page",
        `Login to add your 'COMMENT' !`
      );
      if (response.isConfirmed) {
        return navigate("/login");
      }
    } else if (userRole !== "ProUser") {
      const response = await makeAlert(
        "Become a 'ProUser'",
        `Only 'ProUsers' are allowed  !`
      );
      if (response.isConfirmed) {
        navigate("/payment");
      }
    } else {
      // Start the Update comment sequence
      setOpenCommentSection((currValue) => !currValue);
    }
  };

  // Initial values for the form and formik
  const initialValues = {
    Comment: "",
  };

  // console.log(aUserSurveyResponse.comment);
  useEffect(() => {
    if (user && aUserSurveyResponse?.comment) {
      formik.setValues({
        ...formik.values,
        Comment: aUserSurveyResponse?.comment,
      });
    }
  }, [aUserSurveyResponse, user]);

  // Handle the Update of a survey comment using formik and validation schema design with yup
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: proUserCommentSchema,

    onSubmit: async (values) => {
      setActnBtnLoading(true);

      const payload = {
        comment: values.Comment,
        surveyId: id,
        userId: user?.uid,
        name: user?.displayName || "",
        email: user?.email || "",
      };

      try {
        setActnBtnLoading(true);
        const result = await makeAlert("Yes, Update this comment !");
        if (result.isConfirmed) {
          // id, name, apiName, payload, skipModal, querryToInvalid
          await updateSurveyResponse(
            id,
            "COMMENT",
            "survey-response",
            payload,
            "skip",
            ["single-survey"]
          );
        }
      } catch (err) {
        console.log(err.message);
        setActnBtnLoading(false);
      }
    },
  });

  return (
    <InitialPageStructure
      pageName="Survey Details"
      pageTitle="Detailed Survey Information"
      error={error}
      isPending={isPending}
      data={aSurvey}
    >
      <div className="md:container mx-2 bg-base-100 md:mx-auto">
        <div className="card card-compact w-full p-4">
          <div className="flex w-full flex-col  border rounded-xl dark:border-gray-700 border-gray-300 p-4">
            {/* body part */}
            <div className="flex w-full flex-col lg:flex-row gap-4">
              {/* left side */}
              <div className="flex-1 flex flex-col justify-between w-full ">
                <div>
                  <h2 className="card-title md:text-2xl text-primary ">
                    {aSurvey?.title}
                  </h2>
                </div>

                {/* Description part */}
                <div className="my-4">
                  <h2 className="font-extrabold text-left text-lg">
                    Description:
                  </h2>
                  <p className="text-justify">{aSurvey?.description}</p>
                </div>

                {/* Category part */}
                <div className="flex gap-2 items-center mt-7">
                  <h2 className="font-extrabold text-lg mr-2">Category:</h2>
                  <h5 className="text-primary ">{aSurvey?.category}</h5>
                </div>
              </div>
              <div className="divider divider-horizontal mx-1 hidden lg:flex"></div>

              {/* Right Side */}
              <div className="flex flex-col justify-between flex-1 mt-10 lg:mt-0">
                {/* Deadline Prt */}
                <div className="flex justify-center">
                  <h5 className=" px-7 py-1 bg-primary text-gray-800 font-semibold rounded-xl inline-block">
                    Deadline: {formatDate(aSurvey?.deadline)}
                  </h5>
                </div>

                {/* Vote section */}
                <fieldset className="border-2 border-gray-200 dark:border-gray-600 rounded-lg p-4 mt-6">
                  <legend className="dark:bg-gray-700 bg-gray-200 text-primary rounded-md font-semibold px-2">
                    {aUserSurveyResponse?.vote === "YES" ||
                    aUserSurveyResponse?.vote === "NO"
                      ? "Current Result Of This Survey"
                      : "Make Your Vote"}
                  </legend>
                  <div className="flex justify-center items-center mb-4">
                    <img
                      className=" w-20"
                      src="https://i.ibb.co/gD5VqMw/5-result.png"
                      alt=""
                    />
                  </div>

                  <div className="flex flex-col gap-8">
                    {/* Vote options */}
                    <div className="grid grid-cols-2 gap-1 text-lg">
                      <button
                        onClick={() => handleVoteBtn("YES")}
                        className={`flex gap-2 rounded-md justify-center items-center hover:bg-green-200  hover:text-gray-900 yes_btn_tooltip ${
                          aUserSurveyResponse?.vote === "YES" ||
                          currentVote === "YES"
                            ? "bg-green-200 text-gray-900 duration-300"
                            : "dark:bg-gray-700 bg-gray-200 duration-300"
                        }`}
                      >
                        {(aUserSurveyResponse?.vote === "YES" ||
                          aUserSurveyResponse?.vote === "NO") && (
                          <span className="font-semibold text-green-600">
                            {aSurvey?.yesCount}
                          </span>
                        )}
                        <BiUpvote className="text-xl" />
                        YES
                      </button>
                      <button
                        onClick={() => handleVoteBtn("NO")}
                        className={`flex gap-2 rounded-md justify-center items-center hover:bg-green-200 hover:text-gray-900 no_btn_tooltip ${
                          aUserSurveyResponse?.vote === "NO" ||
                          currentVote === "NO"
                            ? "bg-green-200 text-gray-900 duration-300"
                            : "dark:bg-gray-700 bg-gray-200 duration-300"
                        }`}
                      >
                        {(aUserSurveyResponse?.vote === "YES" ||
                          aUserSurveyResponse?.vote === "NO") && (
                          <span className="font-semibold text-green-600">
                            {aSurvey?.noCount}
                          </span>
                        )}
                        <BiDownvote className="text-xl" />
                        NO
                      </button>
                    </div>

                    {/* Button to submit vote */}
                    {aUserSurveyResponse?.vote !== "NO" &&
                      aUserSurveyResponse?.vote !== "YES" && (
                        <div onClick={handleUpdateVote}>
                          <ActionButton
                            buttonText="Submit Your Vote"
                            isDisable={currentVote === ""}
                          />
                        </div>
                      )}
                  </div>
                </fieldset>
              </div>
            </div>
            <div className="divider mb-8"></div>

            {/* Bottom part */}
            <div className="flex flex-col lg:flex-row justify-between">
              {/* Report section */}
              <fieldset className="border-2 border-gray-200 dark:border-gray-600 rounded-lg p-4">
                <legend className="dark:bg-gray-700 bg-gray-200 text-primary rounded-md font-semibold px-2">
                  Report If You Find This Survey Inappropriate
                </legend>

                <div className="text-lg flex justify-center">
                  <button
                    onClick={handleUpdateReport}
                    className={`flex gap-2 rounded-md justify-center px-8 items-center hover:bg-green-200  hover:text-gray-900 report_btn_tooltip ${
                      aSurvey?.reportCount > 0
                        ? aUserSurveyResponse?.reportStatus === "Reported"
                          ? "bg-pink-200 text-gray-900"
                          : "bg-yellow-300 text-gray-900"
                        : "dark:bg-green-400 text-gray-900"
                    }`}
                  >
                    <span
                      className={`font-semibold text-base ${
                        aSurvey?.reportCount > 0
                          ? "text-gray-800 bg-yellow-400 rounded-xl px-1"
                          : "text-green-800"
                      } `}
                    >
                      {aSurvey?.reportCount}
                    </span>
                    <LuFlag className="text-xl" />
                    {aUserSurveyResponse?.reportStatus === "Reported"
                      ? "Withdraw Report "
                      : "Report Survey"}
                  </button>
                </div>
              </fieldset>

              {/* Like-Dislike-Comment section */}
              <div className="flex w-full lg:w-fit text-lg border-y border-y-gray-200 dark:border-gray-600 py-3 my-5 px-6">
                {/* Like Part */}
                <button
                  onClick={() => handlePreferenceUpdate("LIKE")}
                  className={`px-5 flex flex-grow gap-2 rounded-md justify-center items-center dark:hover:bg-gray-700 hover:bg-gray-200 dark:hover:text-gray-200 like_btn_tooltip  ${
                    aUserSurveyResponse?.preference === "LIKE"
                      ? "bg-green-200 text-gray-900 duration-300"
                      : "duration-300 "
                  }`}
                >
                  <span className="font-semibold">{aSurvey?.likeCount}</span>
                  <SlLike className="text-xl" />
                </button>

                <div className="divider divider-horizontal"></div>

                {/* Comment Part */}
                <button
                  onClick={() => handleCommentUpdate()}
                  className="px-5 flex flex-grow gap-2 rounded-md justify-center items-center dark:hover:bg-gray-700 hover:bg-gray-200  dark:hover:text-gray-200 comment_btn_tooltip"
                >
                  <span className="font-semibold">{aSurvey?.commentCount}</span>
                  <FaRegMessage className="text-xl" />
                </button>

                <div className="divider divider-horizontal"></div>

                {/* DisLike Part */}
                <button
                  onClick={() => handlePreferenceUpdate("DISLIKE")}
                  className={`px-5 flex flex-grow gap-2 rounded-md  justify-center items-center dark:hover:bg-gray-700 hover:bg-gray-200  dark:hover:text-gray-200 dislike_btn_tooltip ${
                    aUserSurveyResponse?.preference === "DISLIKE"
                      ? "bg-green-200 text-gray-900 duration-300"
                      : " duration-300"
                  }`}
                >
                  <span className="font-semibold">{aSurvey?.disLikeCount}</span>
                  <SlDislike className="text-xl" />
                </button>
              </div>
            </div>
          </div>

          {/* Comment section */}
          {openCommentSection && (
            <>
              <form className="mt-10" onSubmit={formik.handleSubmit}>
                <div className="grid grid-cols-1 gap-2 md:gap-5  w-full md:mt-3">
                  {/* Short Description part */}
                  <div className="form-control">
                    <textarea
                      {...formik.getFieldProps("Comment")}
                      onFocus={() => formik.setFieldTouched("Comment", true)}
                      id="comment"
                      rows={6}
                      placeholder="Keep your Comment relevant and constructive . . . "
                      className="text-area-style input input-bordered h-auto placeholder-gray-400 text-sm"
                    />

                    {formik.errors.Comment && formik.touched.Comment && (
                      <div className="text-red-500 mt-2">
                        {formik.errors.Comment}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex gap-10 w-[90%] md:w-[35%] mx-auto mt-8 justify-center">
                  <ActionButton buttonText="Add Your Comment" />
                </div>
              </form>
            </>
          )}
        </div>
      </div>

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

      <Tooltip
        anchorSelect=".report_btn_tooltip"
        place="bottom"
        className="z-50"
        variant="info"
      >
        <p>{`This survey has ${aSurvey?.reportCount} Reports`}</p>
      </Tooltip>
    </InitialPageStructure>
  );
};

export default SurveyDetails;
