import * as Yup from "yup";

export const surveyFormSchema = Yup.object({
  Title: Yup.string().required("Survey title is required"),
  Description: Yup.string().required("Description is required"),
  Category: Yup.string().required("Category is required"),
  Deadline: Yup.date()
    .required("Deadline is required")
    .typeError("Invalid date"),
});
