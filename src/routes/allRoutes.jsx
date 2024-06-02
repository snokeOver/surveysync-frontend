import { createBrowserRouter } from "react-router-dom";
import NotFound from "../pages/NotFound";
import MainLayouts from "../layouts/MainLayouts";
import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Join from "../pages/Join";
import Login from "../pages/Login";

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
        path: "/join",
        element: <Join />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);

export default router;
