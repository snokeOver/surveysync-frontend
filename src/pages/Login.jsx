import { BsEyeSlashFill, BsFillEyeFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import useAuth from "../hooks/useAuth.jsx";
import useData from "../hooks/useData.jsx";
import PageHelmet from "../components/shared/PageHelmet.jsx";
import LogoWithTitle from "../components/shared/join_login/LogoWithTitle.jsx";
import GoogleButton from "../components/shared/join_login/GoogleButton.jsx";
import GithubButton from "../components/shared/join_login/GithubButton.jsx";
import ActionButton from "../components/shared/ActionButton.jsx";
import Container from "../components/shared/Container.jsx";
import SideSectionWithSlidder from "../components/shared/join_login/SideSectionWithSlidder.jsx";
import { useFormik } from "formik";
import { signInSchema } from "../helper/signUpSchema.js";

import useSAxios from "../hooks/useSAxios.jsx";

const Login = () => {
  const sAxios = useSAxios();

  const {
    signIn,
    googleRegister,
    githubRegister,
    logOutSuccess,
    setLogOutSuccess,
    setRegiSuccess,
  } = useAuth();
  const {
    setToastMsg,
    setGBtnLoading,
    setGitBtnLoading,
    setActnBtnLoading,
    gitBtnLoading,
    gBtnLoading,
    actnBtnLoading,
  } = useData();

  const navigate = useNavigate();
  const location = useLocation();

  const [showPass, setShowPass] = useState(false);

  // handle Firebase error while registering
  const firebaseLoginError = (err) => {
    console.log(err.message);
    console.log(err.code);
    if (err.code === "auth/invalid-credential") {
      setToastMsg("err Either email or password is wrong  !");
    } else {
      setToastMsg(`err ${err.code}`);
    }
    setActnBtnLoading(false);
    setGitBtnLoading(false);
    setGBtnLoading(false);
  };

  // Handle All successful firebase Login
  const firebaseLoginSuccess = () => {
    setToastMsg("suc Login Successful  !");
    setActnBtnLoading(false);
    setGitBtnLoading(false);
    setGBtnLoading(false);
    navigate(location?.state ? location.state : "/");
  };

  // Initial values for the form and formik
  const initialValues = {
    Email: "",
    Password: "",
  };

  // Handle the sign in process(email-password based) using formik and validation schema design with yup
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: signInSchema,

    onSubmit: async (values, action) => {
      setActnBtnLoading(true);
      try {
        const { user } = await signIn(values.Email, values.Password);
        setRegiSuccess(true);
        inserUsrInfo(user.email, user.uid, user.displayName);
      } catch (err) {
        firebaseLoginError(err, values.Email);
      } finally {
        action.resetForm();
      }
    },
  });

  // handle the Register with Google button
  const handleGoogleLogin = async () => {
    setGBtnLoading(true);
    try {
      const response = await googleRegister();
      if (response.user) {
        inserUsrInfo(
          response.user.email,
          response.user.uid,
          response.user.displayName
        );
      }
    } catch (err) {
      firebaseLoginError(err);
    }
  };

  // Handle the Register with Github button
  const handleGithubLogin = async () => {
    setGitBtnLoading(true);
    try {
      const response = await githubRegister();
      if (response.user) {
        inserUsrInfo(
          response.user.email,
          response.user.uid,
          response.user.displayName
        );
      }
    } catch (err) {
      firebaseLoginError(err);
    }
  };

  // Log Out success Toast
  useEffect(() => {
    if (logOutSuccess) {
      setToastMsg("Log out successfull  !");
      setLogOutSuccess(false);
    }
  }, [logOutSuccess]);

  // Insert user information in the database
  const inserUsrInfo = async (email, uid, name) => {
    const userInfo = {
      email: email || "Private_Email",
      uid: uid,
      name: name,
      role: "User",
    };

    const { data } = await sAxios.post("/api/create-user", userInfo);
    if (data) {
      firebaseLoginSuccess();
    }
  };

  return (
    <>
      <PageHelmet pageName="Login" />

      <Container nopad="true">
        <div className="hero  rounded-xl flex flex-col lg:flex-row">
          <div className="hero-content  w-full flex-col flex-1 mt-16 md:mt-0 ">
            <LogoWithTitle title="Login Here" />
            <div className="card w-full max-w-lg shadow-2xl bg-base-100">
              {/* form section */}
              <form className="card-body" onSubmit={formik.handleSubmit}>
                {/* email part */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-lg">
                      Email <span className="text-red-500">*</span>
                    </span>
                  </label>
                  <label className="input input-bordered flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className="w-4 h-4 opacity-70"
                    >
                      <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                      <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                    </svg>
                    <input
                      {...formik.getFieldProps("Email")}
                      onFocus={() => formik.setFieldTouched("Email", true)}
                      type="email"
                      id="email"
                      placeholder="name@domain.com"
                      className="grow placeholder-gray-400 text-sm"
                    />
                  </label>
                  {formik.errors.Email && formik.touched.Email && (
                    <span className="text-red-500 mt-2">
                      {formik.errors.Email}
                    </span>
                  )}
                </div>

                {/* password part */}
                <div className="form-control relative">
                  <label className="label">
                    <span className="label-text text-lg">
                      Password <span className="text-red-500">*</span>
                    </span>
                  </label>
                  <label className="input input-bordered flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className="w-4 h-4 opacity-70"
                    >
                      <path
                        fillRule="evenodd"
                        d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <input
                      {...formik.getFieldProps("Password")}
                      onFocus={() => formik.setFieldTouched("Password", true)}
                      type={showPass ? "text" : "password"}
                      id="password"
                      placeholder="* * * * * * * * * * * *"
                      className="grow placeholder-gray-400 text-sm"
                    />
                    <span
                      className="absolute right-5 top-[3.5rem]"
                      onClick={() => setShowPass(!showPass)}
                    >
                      {showPass ? (
                        <BsEyeSlashFill className="text-2xl cursor-pointer text-primary" />
                      ) : (
                        <BsFillEyeFill className="text-2xl cursor-pointer text-primary" />
                      )}
                    </span>
                  </label>
                  {formik.errors.Password && formik.touched.Password && (
                    <span className="text-red-500 mt-2">
                      {formik.errors.Password}
                    </span>
                  )}
                </div>

                <div className="form-control mt-6">
                  <ActionButton buttonText="Login" />
                </div>
              </form>

              <div className="divider  mb-0 px-4">
                Sign in with Social Links
              </div>

              {/* social section  */}
              <div className="card-body">
                <div className=" flex gap-7 flex-col justify-center">
                  {/* Login with google */}

                  <div onClick={handleGoogleLogin} className="inline-block ">
                    <GoogleButton btnTitle="Join with Google" />
                  </div>
                  {/* Login with GitHub */}

                  <div onClick={handleGithubLogin} className="inline-block ">
                    <GithubButton btnTitle="Join with Github" />
                  </div>
                </div>
              </div>

              <label className="label  flex justify-center mb-5">
                <span className="text-sm">Don't have an account?</span>
                <Link
                  className="label-text-alt link link-hover text-blue-700 dark:text-blue-600 font-semibold ml-2"
                  to="/join"
                >
                  join Now
                </Link>
              </label>
            </div>
          </div>
          {/* banner part */}
          <div
            id="login_img"
            className="h-[920px] bg-cover mx-5  bg-no-repeat flex flex-col gap-7 justify-center items-center flex-1 py-5 "
          >
            <SideSectionWithSlidder writings="Find a survey to participate or become a surveyor" />
          </div>
        </div>

        {/* <GoToTopBtn /> */}
      </Container>
    </>
  );
};

export default Login;
