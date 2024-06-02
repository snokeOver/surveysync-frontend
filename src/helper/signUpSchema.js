import * as Yup from "yup";
import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;
const lowerCase = /^(?=.*[a-z])/;
const upperCase = /^(?=.*[A-Z])/;
const specialChar = /^(?=.*[!@#$%^&*])/;
const number = /^(?=.*\d)/;

export const signUpSchema = Yup.object({
  Name: Yup.string().min(4).max(20).required("Please enter your name"),
  Email: Yup.string()
    .email("Email must be a valid email")
    .required("Please enter your email")
    .test("email-exists", "This email is taken!", async function (value) {
      try {
        const { data } = await axios.post(`${baseURL}/api/check-email`, {
          email: value,
        });
        return !data;
      } catch (err) {
        console.log(err);
        return true;
      }
    }),
  Password: Yup.string()
    .min(8)
    .max(25)
    .matches(lowerCase, "Password must contain a-z")
    .matches(upperCase, "Password must contain A-Z")
    .matches(specialChar, "Password must contain !@#$%^&")
    .matches(number, "Password must contain 0-9")
    .required("Please enter your password"),
  RepeatPassword: Yup.string()
    .oneOf([Yup.ref("Password"), null], "Passwords didn't match")
    .required("Please confirm your password again"),
  AcceptTerms: Yup.boolean()
    .oneOf([true], "You must accept the terms and conditions")
    .required("You must accept the terms and conditions"),
});

export const signInSchema = Yup.object({
  Email: Yup.string()
    .email("Email must be a valid email")
    .required("Please enter your email"),
  Password: Yup.string().required("Please enter your password"),
});
