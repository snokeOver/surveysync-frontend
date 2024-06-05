import { Tooltip } from "react-tooltip";
import GoToTopBtn from "../components/shared/GoToTopBtn";
import PageHelmet from "../components/shared/PageHelmet";
import { useNavigate, useParams } from "react-router-dom";
import useGetASurvey from "../hooks/useGetASurvey";
import ButtonSpinner from "../components/shared/ButtonSpinner";
import PageTitle from "../components/shared/PageTitle";
import Container from "../components/shared/Container";
import { formatDate } from "../helper/helperFunction";
import { BiDownvote, BiUpvote } from "react-icons/bi";
import { SlDislike, SlLike } from "react-icons/sl";

import { FaRegMessage } from "react-icons/fa6";
import useUpdateData from "../hooks/useUpdateData";
import useAuth from "../hooks/useAuth";
import useSweetAlert from "../hooks/useSweetAlert";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import useData from "../hooks/useData";
import { proUserCommentSchema } from "../helper/formValidation";
import useGetUsersASurveyResponse from "../hooks/useGetUsersASurveyResponse";
import ActionButton from "../components/shared/ActionButton";
import useGetUserRole from "../hooks/useGetUserRole";

const SurveyDetails = () => {
  const { user } = useAuth(); //Update this with userInfo from useAuth
  const { setActnBtnLoading } = useData();
  const { id } = useParams();
  const makeAlert = useSweetAlert();
  const navigate = useNavigate();
  const { aSurvey, aSurveyError, aSurveyPending } = useGetASurvey(id);

  const {
    aUserSurveyResponse,
    aUserSurveyResponseError,
    aUserSurveyResponsePending,
  } = useGetUsersASurveyResponse(id);

  const { userRole } = useGetUserRole();

  const updateSurveyResponse = useUpdateData();

  const [openCommentSection, setOpenCommentSection] = useState(false);
  const [isDisableBtn, setIsDisableBtn] = useState(false);
  const [currComment, setCurrComment] = useState("");

  // Handle vote update
  const handleUpdateVote = async (vote) => {
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
      vote,
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
      "skip",
      "single-survey"
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
      "single-survey"
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
        // Open a modal to make secure payment
      }
    } else {
      // Start the Update comment sequence
      setOpenCommentSection((currValue) => !currValue);
    }
  };

  // Initial values for the form and formik
  const [initialValues, setInitialValues] = useState({
    Comment: "",
  });
  useEffect(() => {
    if (aUserSurveyResponse.comment) {
      setInitialValues({ Comment: aUserSurveyResponse.comment });
      setCurrComment(aUserSurveyResponse.comment);
      formik.setValues({ Comment: aUserSurveyResponse.comment });
    }
  }, [aUserSurveyResponse]);

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
            "single-survey"
          );
        }
      } catch (err) {
        console.log(err.message);
        setActnBtnLoading(false);
      }
    },
  });

  // Handle if the add-comment button will be disabled or not
  useEffect(() => {
    if (aUserSurveyResponse.comment === currComment) {
      setIsDisableBtn(true);
    } else {
      setIsDisableBtn(false);
    }
  }, [currComment]);

  return (
    <>
      <PageHelmet pageName="Survey Details" />
      <Container>
        <PageTitle title="Detailed Survey Information" />

        {/* Handle error */}
        {(aSurveyError || aUserSurveyResponseError) && (
          <div>Error: {aSurveyError.message}</div>
        )}

        {/* Handle pending time */}
        {aSurveyPending || aUserSurveyResponsePending ? (
          <ButtonSpinner />
        ) : (
          <div className="md:container mx-2 bg-base-100 md:mx-auto">
            <div className="card card-compact w-full p-4">
              <div className="flex w-full flex-col lg:flex-row gap-4 border rounded-xl dark:border-gray-700 border-gray-300 p-4">
                {/* left sidet */}
                <div className="flex-1 w-full">
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
                <div className="divider divider-horizontal mx-1 hidden lg:flex"></div>
                {/* Right Side */}
                <div className="card-body justify-between flex-1 text-left">
                  {/* Deadline Prt */}
                  <div className="flex justify-center">
                    <h5 className=" px-7 py-1 bg-primary text-gray-800 font-semibold rounded-xl inline-block">
                      Deadline: {formatDate(aSurvey?.deadline)}
                    </h5>
                  </div>

                  {/* Vote section */}
                  <div className="grid grid-cols-2 gap-1 text-lg my-5">
                    <button
                      onClick={() => handleUpdateVote("YES")}
                      className={`flex gap-2 rounded-md justify-center items-center hover:bg-green-200  hover:text-gray-900 yes_btn_tooltip ${
                        aUserSurveyResponse?.vote === "YES"
                          ? "bg-green-200 text-gray-900"
                          : "dark:bg-gray-700 bg-gray-200"
                      }`}
                    >
                      <span className="font-semibold text-green-600">
                        {aSurvey?.yesCount}
                      </span>
                      <BiUpvote className="text-xl" />
                      YES
                    </button>
                    <button
                      onClick={() => handleUpdateVote("NO")}
                      className={`flex gap-2 rounded-md justify-center items-center hover:bg-green-200  hover:text-gray-900 no_btn_tooltip ${
                        aUserSurveyResponse?.vote === "NO"
                          ? "bg-green-200 text-gray-900"
                          : "dark:bg-gray-700 bg-gray-200"
                      }`}
                    >
                      <span className="font-semibold text-red-700">
                        {aSurvey?.noCount}
                      </span>
                      <BiDownvote className="text-xl" />
                      NO
                    </button>
                  </div>

                  {/* Like-Dislike-Comment section */}
                  <div className="flex w-full text-lg border-y border-y-gray-200 dark:border-gray-600 py-3">
                    {/* Like Part */}

                    <button
                      onClick={() => handlePreferenceUpdate("LIKE")}
                      className={`px-5 flex flex-grow gap-2 rounded-md justify-center items-center dark:hover:bg-gray-700 hover:bg-gray-200 dark:hover:text-gray-200 like_btn_tooltip  ${
                        aUserSurveyResponse?.preference === "LIKE"
                          ? "bg-green-200 text-gray-900"
                          : " "
                      }`}
                    >
                      <span className="font-semibold">
                        {aSurvey?.likeCount}
                      </span>
                      <SlLike className="text-xl" />
                    </button>

                    <div className="divider divider-horizontal"></div>

                    {/* Comment Part */}

                    <button
                      onClick={() => handleCommentUpdate()}
                      className="px-5 flex flex-grow gap-2 rounded-md justify-center items-center dark:hover:bg-gray-700 hover:bg-gray-200  dark:hover:text-gray-200 comment_btn_tooltip"
                    >
                      <span className="font-semibold">
                        {aSurvey?.commentCount}
                      </span>
                      <FaRegMessage className="text-xl" />
                    </button>

                    <div className="divider divider-horizontal"></div>
                    {/* DisLike Part */}

                    <button
                      onClick={() => handlePreferenceUpdate("DISLIKE")}
                      className={`px-5 flex flex-grow gap-2 rounded-md  justify-center items-center dark:hover:bg-gray-700 hover:bg-gray-200  dark:hover:text-gray-200 dislike_btn_tooltip ${
                        aUserSurveyResponse?.preference === "DISLIKE"
                          ? "bg-green-200 text-gray-900"
                          : " "
                      }`}
                    >
                      <span className="font-semibold">
                        {aSurvey?.disLikeCount}
                      </span>
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
                          onFocus={() =>
                            formik.setFieldTouched("Comment", true)
                          }
                          id="comment"
                          value={currComment}
                          onChange={(e) => setCurrComment(e.target.value)}
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
                      <ActionButton
                        isDisable={isDisableBtn}
                        buttonText="Add Your Comment"
                      />
                    </div>
                  </form>
                </>
              )}
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
