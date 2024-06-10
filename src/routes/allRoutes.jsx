import { createBrowserRouter } from "react-router-dom";
import NotFound from "../pages/NotFound";
import MainLayouts from "../layouts/MainLayouts";
import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Join from "../pages/Join";
import Login from "../pages/Login";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import ParticipatedSurveys from "../components/dashboard/user/ParticipatedSurveys";
import ReportedSurveys from "../components/dashboard/user/ReportedSurveys";
import ManageUsers from "../components/dashboard/admin/ManageUsers";
import ManageSurveys from "../components/dashboard/admin/ManageSurveys";
import ViewAllPayments from "../components/dashboard/admin/ViewAllPayments";
import CreateASurvey from "../components/dashboard/surveyor/CreateASurvey";
import MyCreatedSurveys from "../components/dashboard/surveyor/MyCreatedSurveys";
import SurveyResponses from "../components/dashboard/surveyor/SurveyResponses";
import SurveyFeedbackes from "../components/dashboard/surveyor/SurveyFeedbackes";
import SurveyDetails from "../pages/SurveyDetails";
import Profile from "../pages/Profile";
import MyCommentedSurveys from "../components/dashboard/proUser/MyCommentedSurveys";
import Surveys from "../pages/Surveys";
import RequestForSurveyor from "../components/dashboard/user/RequestForSurveyor";
import Payment from "../pages/Payment";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayouts />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "payment",
        element: <Payment />,
      },
      {
        path: "/survey-details/:id",
        element: <SurveyDetails />,
      },
      {
        path: "/surveys",
        element: <Surveys />,
      },
      {
        path: "/join",
        element: (
          <PublicRoute>
            <Join />
          </PublicRoute>
        ),
      },
      {
        path: "/login",
        element: (
          <PublicRoute>
            <Login />
          </PublicRoute>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      // Mango People routes
      {
        path: "user/surveys",
        element: <ParticipatedSurveys />,
      },
      {
        path: "user/request",
        element: <RequestForSurveyor />,
      },

      {
        path: "user/my-reports",
        element: <ReportedSurveys />,
      },
      {
        path: "user/comments",
        element: <MyCommentedSurveys />,
      },
      // Surveyor Routes
      {
        path: "surveyor/create",
        element: <CreateASurvey />,
      },
      {
        path: "surveyor/feedbacks",
        element: <SurveyFeedbackes />,
      },
      {
        path: "surveyor/surveys",
        element: <MyCreatedSurveys />,
      },
      {
        path: "surveyor/survey/:id",
        element: <SurveyResponses />,
      },
      //  Admin Routes
      {
        path: "admin/users",
        element: <ManageUsers />,
      },
      {
        path: "admin/surveys",
        element: <ManageSurveys />,
      },
      {
        path: "admin/payments",
        element: <ViewAllPayments />,
      },
    ],
  },
]);

export default router;
