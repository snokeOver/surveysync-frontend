import Container from "../../shared/Container";
import GoToTopBtn from "../../shared/GoToTopBtn";
import PageHelmet from "../../shared/PageHelmet";
import PageTitle from "../../shared/PageTitle";
import ButtonSpinner from "../../shared/ButtonSpinner";
import useUpdateData from "../../../hooks/useUpdateData";
import { useEffect, useState } from "react";
import ActionButton from "../../shared/ActionButton";
import SingleSurveyRow from "./SingleSurveyRow";
import { useFormik } from "formik";
import { manageSurveyFormSchema } from "../../../helper/formValidation";
import useData from "../../../hooks/useData";
import DatePicker from "react-datepicker";
import { FaLock } from "react-icons/fa";
import useGetData from "../../../hooks/useGetData";
import InitialPageStructure from "../shared/InitialPageStructure";

const ManageSurveys = () => {
  const {
    data: allSurveys,
    isPending,
    error,
  } = useGetData({ apiRoute: "all-surveys" });

  const { setActnBtnLoading } = useData();

  const updateSurveyStatus = useUpdateData();

  const [openModal, setOpenModal] = useState(false);
  const [currentSurvey, setCurrentSurvey] = useState({});

  // handle the Update initiation
  const surveyStatusUpdateInitiate = (survey) => {
    setCurrentSurvey(survey);
    setOpenModal(true);
  };

  // Initial values for the form and formik
  const initialValues = {
    Title: "",
    Deadline: new Date(),
    Category: "",
    Description: "",
    Feedback: "",
    Status: "",
  };

  // set the values as soon as the modal is open
  useEffect(() => {
    if (currentSurvey) {
      formik.setValues({
        ...formik.values,
        Title: currentSurvey.title,
        Deadline: currentSurvey.deadline,
        Category: currentSurvey.category,
        Description: currentSurvey.description,
        Status: currentSurvey.status,
      });
    }
  }, [currentSurvey]);

  // Handle the update  of a survey process using formik and validation schema design with yup
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: manageSurveyFormSchema,

    onSubmit: async (values, actions) => {
      setActnBtnLoading(true);

      const payload = {
        feedback: values.Feedback,
        status: values.Status,
        surveyorId: currentSurvey.surveyorId,
      };

      try {
        // id, name, apiName, payload, skipModal, querryToInvalid
        await updateSurveyStatus(
          currentSurvey._id,
          "Status",
          "update-survey-status",
          payload,
          "noSkip",
          "all-surveys"
        );
        actions.resetForm();
        setOpenModal(false);
      } catch (err) {
        console.log(err.message);
        setActnBtnLoading(false);
      }
    },
  });

  return (
    <InitialPageStructure
      pageName="Manage Surveys"
      pageTitle="All Published & Unpublished Surveys"
      error={error}
      isPending={isPending}
      data={allSurveys}
      emptyDataMsg="No Surveys To Show!"
      totalName="Survey"
    >
      {/* Table section */}
      <div className="  mx-auto">
        {allSurveys.length > 0 && (
          <div className="card w-full  shadow-2xl bg-base-100">
            {/* Table for cart */}
            <div className="overflow-x-auto py-7  bg-base-300">
              <table className="table">
                {/* head */}
                <thead>
                  <tr className="text-left text-lg">
                    <th>#</th>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Last Updated</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                  <tr>
                    <th colSpan="6">
                      <div className="divider -my-3"></div>
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {allSurveys.map((singleSurvey, index) => (
                    <SingleSurveyRow
                      index={index}
                      key={singleSurvey._id}
                      singleSurvey={singleSurvey}
                      surveyStatusUpdateInitiate={surveyStatusUpdateInitiate}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* modal to update Survey status */}
      <dialog
        id="spot_update_modal"
        className={`modal ${openModal ? "modal-open" : ""} `}
      >
        <div
          id="form-modal"
          className="modal-box w-11/12 max-w-5xl bg-base-200"
        >
          <form method="dialog">
            <button
              onClick={() => setOpenModal(false)}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>
          </form>
          <div>
            <h2 className="text-2xl text-center font-semibold mb-5">
              Update this Survey Status
            </h2>
          </div>
          <div className=" lg:w-[80%] xl:w-[70%] lg:mx-auto">
            <form onSubmit={formik.handleSubmit}>
              {/* first row */}
              <div className="grid grid-cols-1  gap-2 md:gap-5  w-full">
                {/* Title part */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-lg">Survey Title</span>
                  </label>
                  <label className="input input-bordered flex items-center gap-2 relative">
                    <input
                      {...formik.getFieldProps("Title")}
                      readOnly
                      className="grow placeholder-gray-400 text-sm"
                    />
                    <FaLock className="text-lg absolute right-5 bottom-4" />
                  </label>
                </div>
              </div>

              {/* second row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-5  w-full md:mt-3">
                {/* Deadline part */}
                <div className="form-control relative">
                  <label className="label">
                    <span className="label-text text-lg">Deadline</span>
                  </label>
                  <DatePicker
                    className="input input-bordered flex items-center gap-2 w-full"
                    dateFormat="dd/MM/yyyy"
                    selected={formik.values.Deadline}
                    readOnly
                  />
                  <FaLock className="text-lg absolute right-5 bottom-4" />
                </div>

                {/* Category part */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-lg">Category</span>
                  </label>
                  <label className="input input-bordered flex items-center gap-2 relative">
                    <input
                      {...formik.getFieldProps("Category")}
                      readOnly
                      className="grow placeholder-gray-400 text-sm"
                    />
                    <FaLock className="text-lg absolute right-5 bottom-4" />
                  </label>
                </div>
              </div>

              {/* Third row */}
              <div className="grid grid-cols-1 gap-2 md:gap-5  w-full md:mt-3">
                {/* Short Description part */}
                <div className="form-control relative">
                  <label className="label">
                    <span className="label-text text-lg">
                      Short Description
                    </span>
                  </label>
                  <textarea
                    readOnly
                    rows={3}
                    {...formik.getFieldProps("Description")}
                    className="text-area-style input input-bordered h-auto placeholder-gray-400 text-sm"
                  />
                  <FaLock className="text-lg absolute right-5 bottom-7" />
                </div>
              </div>

              <div className="divider my-10">
                Update Survey Status with feedback
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-5  w-full md:mt-3">
                {/* Survey Status part */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-lg">
                      Survey Status
                      <span className="text-red-500">*</span>
                    </span>
                  </label>
                  <select
                    {...formik.getFieldProps("Status")}
                    onFocus={() => formik.setFieldTouched("Status", true)}
                    type="text"
                    className="select select-bordered w-full"
                  >
                    <option disabled value="">
                      Select a Status
                    </option>
                    <option value="Published">Published</option>
                    <option value="Unpublished">Unpublished</option>
                  </select>
                </div>

                {/* Feedback part */}
                <div className="form-control md:col-span-3">
                  <label className="label">
                    <span className="label-text text-lg">
                      Feedback
                      <span className="text-red-500">*</span>
                    </span>
                  </label>
                  <textarea
                    {...formik.getFieldProps("Feedback")}
                    onFocus={() => formik.setFieldTouched("Feedback", true)}
                    rows={3}
                    placeholder="Write a constructive Feedback here . . . "
                    className="text-area-style input input-bordered h-auto placeholder-gray-400 text-sm"
                  />
                  {formik.errors.Feedback && formik.touched.Feedback && (
                    <div className="text-red-500 mt-2">
                      {formik.errors.Feedback}
                    </div>
                  )}
                </div>
              </div>
              <div className="form-control mt-6 md:w-1/2 mx-auto">
                <ActionButton buttonText="Update This Survey Status" />
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </InitialPageStructure>
  );
};

export default ManageSurveys;
