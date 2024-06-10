import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

import SingleSurveyRow from "./SingleSurveyRow";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import ActionButton from "../../shared/ActionButton";
import useData from "../../../hooks/useData";
import useDeleteData from "../../../hooks/useDeleteData";
import { surveyFormSchema } from "../../../helper/formValidation";
import { useFormik } from "formik";
import useUpdateData from "../../../hooks/useUpdateData";
import InitialPageStructure from "../shared/InitialPageStructure";
import useGetData from "../../../hooks/useGetData";
import TableViewStructure from "../shared/TableViewStructure";

const MyCreatedSurveys = () => {
  const { user } = useAuth();
  const deleteSurvey = useDeleteData();
  const updateSurvey = useUpdateData();
  const { setActnBtnLoading } = useData();

  const {
    data: mySurveys,
    isPending,
    error,
  } = useGetData({ apiRoute: "surveyor-surveys" });

  const [openModal, setOpenModal] = useState(false);
  const [currentSurvey, setCurrentSurvey] = useState({});
  const navigate = useNavigate();

  const surveyCategories = [
    "Customer Satisfaction",
    "Employee Engagement",
    "Market Research",
    "Product Feedback",
    "Event Feedback",
    "Brand Awareness",
    "User Experience",
    "Service Quality",
  ];

  // Initial values for the form and formik
  const initialValues = {
    Title: "",
    Deadline: new Date(),
    Category: "",
    Description: "",
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
      });
    }
  }, [currentSurvey]);

  // Handle the update  of a survey process using formik and validation schema design with yup
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: surveyFormSchema,

    onSubmit: async (values) => {
      setActnBtnLoading(true);

      const payload = {
        surveyorId: user.uid,
        title: values.Title,
        description: values.Description,
        deadline: values.Deadline,
        category: values.Category,
      };
      try {
        // id, name, apiName, payload, skipModal, querryToInvalid
        await updateSurvey(
          currentSurvey._id,
          "Survey",
          "survey",
          payload,
          "noSkip",
          "my-surveys"
        );
        setOpenModal(false);
      } catch (err) {
        console.log(err.message);
        setActnBtnLoading(false);
      }
    },
  });

  //   Hanlde update Survey
  const handleUpdateSurvey = (currSurvey) => {
    setOpenModal(true);
    setCurrentSurvey(currSurvey);
  };

  // Handle the delete operation of food items from cart
  const handleDeleteSurvey = async (id) => {
    deleteSurvey(id, "Survey", "survey");
  };

  // Hanlde the view details button
  const handleViewDetails = (id) => {
    navigate(`/dashboard/surveyor/survey/${id}`);
  };

  return (
    <InitialPageStructure
      pageName="Created Surveys"
      pageTitle="All my created Surveys"
      error={error}
      isPending={isPending}
      data={mySurveys || []}
      emptyDataMsg="You didn't create any survey Yet!"
      direction={`/dashboard/surveyor/create`}
      totalName="Survey"
    >
      {/* Table section */}
      <TableViewStructure
        data={mySurveys || []}
        tabCols={["Title", "Category", "Deadline", "Responses"]}
        actionBtnNumbers={3}
      >
        {mySurveys &&
          mySurveys.map((singleSurvey, index) => (
            <SingleSurveyRow
              index={index}
              key={singleSurvey._id}
              singleSurvey={singleSurvey}
              handleDeleteSurvey={handleDeleteSurvey}
              handleUpdateSurvey={handleUpdateSurvey}
              handleViewDetails={handleViewDetails}
            />
          ))}
      </TableViewStructure>

      {/* modal to update Survey */}
      <dialog
        id="spot_update_modal"
        className={`modal ${openModal ? "modal-open" : ""} `}
      >
        <div
          id="form-modal"
          className="modal-box w-11/12 max-w-5xl bg-base-200"
        >
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button
              onClick={() => setOpenModal(false)}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>
          </form>
          <div>
            <h2 className="text-2xl text-center font-semibold mb-5">
              Update this Survey
            </h2>
          </div>
          <div className=" lg:w-[80%] xl:w-[70%] lg:mx-auto">
            <form onSubmit={formik.handleSubmit}>
              {/* first row */}
              <div className="grid grid-cols-1  gap-2 md:gap-5  w-full">
                {/* Title part */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-lg">
                      Survey Title <span className="text-red-500">*</span>
                    </span>
                  </label>
                  <label className="input input-bordered flex items-center gap-2">
                    <input
                      {...formik.getFieldProps("Title")}
                      onFocus={() => formik.setFieldTouched("Title", true)}
                      type="text"
                      id="title"
                      placeholder="Write a title"
                      className="grow placeholder-gray-400 text-sm"
                    />
                  </label>
                  {formik.errors.Title && formik.touched.Title && (
                    <div className="text-red-500 mt-2">
                      {formik.errors.Title}
                    </div>
                  )}
                </div>
              </div>

              {/* second row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-5  w-full md:mt-3">
                {/* Deadline part */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-lg">
                      Deadline <span className="text-red-500">*</span>
                    </span>
                  </label>

                  <DatePicker
                    className="input input-bordered flex items-center gap-2 w-full"
                    id="deadline"
                    minDate={Date.now()}
                    dateFormat="dd/MM/yyyy"
                    selected={formik.values.Deadline}
                    onChange={(date) => formik.setFieldValue("Deadline", date)}
                    onFocus={() => formik.setFieldTouched("Deadline", true)}
                  />
                  {formik.errors.Deadline && formik.touched.Deadline && (
                    <div className="text-red-500 mt-2">
                      {formik.errors.Deadline}
                    </div>
                  )}
                </div>

                {/* Category part */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-lg">
                      Category <span className="text-red-500">*</span>
                    </span>
                  </label>
                  <select
                    {...formik.getFieldProps("Category")}
                    onFocus={() => formik.setFieldTouched("Category", true)}
                    type="text"
                    id="category"
                    className="select select-bordered w-full"
                  >
                    <option disabled value="">
                      Select a Category
                    </option>
                    {surveyCategories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                  {formik.errors.Category && formik.touched.Category && (
                    <div className="text-red-500 mt-2">
                      {formik.errors.Category}
                    </div>
                  )}
                </div>
              </div>

              {/* Third row */}
              <div className="grid grid-cols-1 gap-2 md:gap-5  w-full md:mt-3">
                {/* Short Description part */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-lg">
                      Short Description <span className="text-red-500">*</span>
                    </span>
                  </label>
                  <textarea
                    {...formik.getFieldProps("Description")}
                    onFocus={() => formik.setFieldTouched("Description", true)}
                    id="description"
                    rows={6}
                    placeholder="Write relevant description here . . . "
                    className="text-area-style input input-bordered h-auto placeholder-gray-400 text-sm"
                  />
                  {formik.errors.Description && formik.touched.Description && (
                    <div className="text-red-500 mt-2">
                      {formik.errors.Description}
                    </div>
                  )}
                </div>
              </div>
              <div className="form-control mt-6 md:w-1/2 mx-auto">
                <ActionButton buttonText="Update This Survey" />
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </InitialPageStructure>
  );
};

export default MyCreatedSurveys;
