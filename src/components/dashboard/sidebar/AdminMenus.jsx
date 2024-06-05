import DynamicNavLinks from "./DynamicNavLinks";
import { BsGraphUp } from "react-icons/bs";
import { FcSurvey } from "react-icons/fc";
import { GiTakeMyMoney } from "react-icons/gi";
import { MdOutlineManageAccounts } from "react-icons/md";

const AdminMenus = () => {
  return (
    <>
      {/* Statistics */}
      <DynamicNavLinks
        address="/dashboard"
        name="Statistics"
        icon={BsGraphUp}
      />

      {/* Manage users */}
      <DynamicNavLinks
        address="admin/users"
        name="Manage Users"
        icon={MdOutlineManageAccounts}
      />

      {/* Manage Surveys */}
      <DynamicNavLinks
        address="admin/surveys"
        name="Manage Surveys"
        icon={FcSurvey}
      />

      {/* Manage Payments */}
      <DynamicNavLinks
        address="admin/payments"
        name="Manage Payments"
        icon={GiTakeMyMoney}
      />
    </>
  );
};

export default AdminMenus;
