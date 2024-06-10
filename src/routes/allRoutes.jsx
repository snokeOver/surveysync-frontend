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
import UpdateSurvey from "../components/dashboard/surveyor/UpdateSurvey";
import AdminDashboardLayout from "../layouts/AdminDashboardLayout";
import UserDashboardLayout from "../layouts/UserDashboardLayout";
import SurveyorDashboardLayout from "../layouts/SurveyorDashboardLayout";

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
  // Only Admin
  {
    path: "/dashboard/admin",
    element: (
      <PrivateRoute>
        <AdminDashboardLayout />
      </PrivateRoute>
    ),
    children: [
      //  Admin Routes
      {
        path: "users",
        element: <ManageUsers />,
      },
      {
        path: "surveys",
        element: <ManageSurveys />,
      },
      {
        path: "payments",
        element: <ViewAllPayments />,
      },
    ],
  },
  {
    path: "/dashboard/user",
    element: (
      <PrivateRoute>
        <UserDashboardLayout />
      </PrivateRoute>
    ),
    children: [
      // Mango People routes
      {
        path: "surveys",
        element: <ParticipatedSurveys />,
      },
      {
        path: "request",
        element: <RequestForSurveyor />,
      },

      {
        path: "my-reports",
        element: <ReportedSurveys />,
      },
      {
        path: "comments",
        element: <MyCommentedSurveys />,
      },
    ],
  },
  {
    path: "/dashboard/surveyor",
    element: (
      <PrivateRoute>
        <SurveyorDashboardLayout />
      </PrivateRoute>
    ),
    children: [
      // Surveyor Routes
      {
        path: "create",
        element: <CreateASurvey />,
      },
      {
        path: "update/:id",
        element: <UpdateSurvey />,
      },
      {
        path: "feedbacks",
        element: <SurveyFeedbackes />,
      },
      {
        path: "surveys",
        element: <MyCreatedSurveys />,
      },
      {
        path: "survey/:id",
        element: <SurveyResponses />,
      },
    ],
  },
]);

export default router;
