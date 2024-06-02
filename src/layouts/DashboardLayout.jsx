import { Outlet } from "react-router-dom";
import Sidebar from "../components/dashboard/sidebar/Sidebar";
import Header from "../components/header/Header";

const DashboardLayout = () => {
  return (
    <div>
      <Header />
      <div className="md:flex ">
        <Sidebar />
      </div>
      <div className="flex-1 md:ml-56 p-5">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
