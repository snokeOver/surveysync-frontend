import ActionButton from "../../shared/ActionButton";
import Container from "../../shared/Container";
import PageHelmet from "../../shared/PageHelmet";
import PageTitle from "../../shared/PageTitle";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import useAuth from "../../../hooks/useAuth";
import useData from "../../../hooks/useData";
import { surveyFormSchema } from "../../../helper/formValidation";
import { useFormik } from "formik";
import usePostData from "../../../hooks/usePostData";

const CreateASurvey = () => {
  const { user } = useAuth();
  const createSurvey = usePostData();
  const { setActnBtnLoading, surveyCategories } = useData();

  // Initial values for the form and formik
  const initialValues = {
    Title: "",
    Deadline: new Date(),
    Category: "",
    Description: "",
  };

  // Handle the Creating of a survey process using formik and validation schema design with yup
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: surveyFormSchema,

    onSubmit: async (values, action) => {
      setActnBtnLoading(true);

      const postData = {
        surveyorId: user.uid,
        title: values.Title,
        description: values.Description,
        deadline: values.Deadline,
        category: values.Category,
      };

      await createSurvey("Survey", "create-survey", postData, "noSkip", [
        "surveyor-surveys",
      ]);

      action.resetForm();
    },
  });

  return (
    <>
      <PageHelmet pageName="Create Survey" />
      <Container>
        <PageTitle title="Create A Survey" />
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
                  <div className="text-red-500 mt-2">{formik.errors.Title}</div>
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

            {/* Thord row */}
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
              <ActionButton buttonText="Create Survey" />
            </div>
          </form>
        </div>
      </Container>
    </>
  );
};

export default CreateASurvey;
