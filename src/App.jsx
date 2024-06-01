import { RouterProvider } from "react-router-dom";
import router from "./routes/allRoutes";
import { ToastContainer, toast } from "react-toastify";
import useData from "./hooks/useData";
import { useEffect } from "react";

const App = () => {
  const { toastMsg, setToastMsg, currTheme } = useData();

  //   All toast will fire here
  useEffect(() => {
    if (toastMsg) {
      toast(toastMsg, {
        position: "bottom-center",
      });
    }
    setToastMsg("");
  }, [toastMsg]);

  return (
    <div className="font-lato">
      <RouterProvider router={router} />
      <ToastContainer theme={currTheme} autoClose={2600} />
    </div>
  );
};

export default App;
