import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import useUserSurveys from "../../../hooks/useUserSurveys";
import Container from "../../shared/Container";
import GoToTopBtn from "../../shared/GoToTopBtn";
import PageHelmet from "../../shared/PageHelmet";
import PageTitle from "../../shared/PageTitle";
import PrimaryButton from "../../shared/PrimaryButton";
import SingleSurveyRow from "./SingleSurveyRow";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import ActionButton from "../../shared/ActionButton";
import useData from "../../../hooks/useData";
import useDeleteData from "../../../hooks/useDeleteData";
import { surveyFormSchema } from "../../../helper/formValidation";
import { useFormik } from "formik";
import useUpdateData from "../../../hooks/useUpdateData";

const MyCreatedSurveys = () => {
  const { user } = useAuth();
  const deleteSurvey = useDeleteData();
  const updateSurvey = useUpdateData();
  const { setActnBtnLoading } = useData();
  const { mySurveys, mySurveysError, mySurveysPending } = useUserSurveys(
    user.uid
  );
  const [openModal, setOpenModal] = useState(false);
  const [currentSurvey, setCurrentSurvey] = useState({});

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
        await updateSurvey(currentSurvey._id, "Survey", "survey", payload);
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
    console.log(id);
  };

  if (mySurveysPending) {
    return <div>Loading...</div>;
  }

  if (mySurveysError) {
    return <div>Error: {mySurveysError.message}</div>;
  }
  return (
    <>
      <PageHelmet pageName="Created Surveys" />
      <Container>
        <PageTitle title="All the surveys you created" />

        <div className=" rounded-lg bg-base-100 pb-5 md:pb-10">
          <div className="text-center flex-col">
            <div className="text-center py-2">
              {mySurveys.length < 1 && (
                <>
                  <h1 className="text-xl lg:text-4xl font-bold py-10">
                    You didn't create any surveys yet !
                  </h1>
                  <div className="text-center text-lg mb-5" colSpan="6">
                    <span className="mr-3">To create surveys</span>
                    <span className="inline-block">
                      <Link to="dashboard/surveyor/create">
                        <PrimaryButton buttonText="Click Here" />
                      </Link>
                    </span>
                  </div>
                </>
              )}
            </div>
            {/* heading section */}
            <div className=" flex  items-center w-[90%] mx-auto gap-x-3 my-4">
              <h2 className="text-lg  font-medium ">Total</h2>

              <span className="px-3 py-1 text-xs text-gray-900 bg-blue-100 rounded-full ">
                {mySurveys.length}
                <span className="ml-1"> Survey (s)</span>
              </span>
            </div>
            {/* Table section */}
            <div className="  mx-auto">
              {mySurveys.length > 0 && (
                <div className="card w-full  shadow-2xl bg-base-100">
                  {/* Table for cart */}
                  <div className="overflow-x-auto py-7  bg-base-300">
                    <table className="table">
                      {/* head */}
                      <thead>
                        <tr className="text-left text-lg">
                          <th></th>
                          <th>Title</th>
                          <th>Category</th>
                          <th>Deadline</th>
                          <th colSpan="3" className="text-center">
                            Actions
                          </th>
                        </tr>
                        <tr>
                          <th colSpan="7">
                            <div className="divider -my-3"></div>
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {mySurveys.map((singleSurvey, index) => (
                          <SingleSurveyRow
                            index={index}
                            key={singleSurvey._id}
                            singleSurvey={singleSurvey}
                            handleDeleteSurvey={handleDeleteSurvey}
                            handleUpdateSurvey={handleUpdateSurvey}
                            handleViewDetails={handleViewDetails}
                          />
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* modal to update spot */}
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
                      minDate={formik.values.Deadline}
                      dateFormat="dd/MM/yyyy"
                      selected={formik.values.Deadline}
                      onChange={(date) =>
                        formik.setFieldValue("Deadline", date)
                      }
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

                {/* Thord row */}
                <div className="grid grid-cols-1 gap-2 md:gap-5  w-full md:mt-3">
                  {/* Short Description part */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-lg">
                        Short Description{" "}
                        <span className="text-red-500">*</span>
                      </span>
                    </label>
                    <textarea
                      {...formik.getFieldProps("Description")}
                      onFocus={() =>
                        formik.setFieldTouched("Description", true)
                      }
                      id="description"
                      rows={6}
                      placeholder="Write relevant description here . . . "
                      className="text-area-style input input-bordered h-auto placeholder-gray-400 text-sm"
                    />
                    {formik.errors.Description &&
                      formik.touched.Description && (
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

        <GoToTopBtn />
      </Container>

      <GoToTopBtn />
    </>
  );
};

export default MyCreatedSurveys;
