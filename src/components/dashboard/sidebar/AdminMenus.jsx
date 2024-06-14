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
        address="/dashboard/admin"
        name="Admin Statistics"
        icon={BsGraphUp}
      />

      {/* Manage users */}
      <DynamicNavLinks
        address="/dashboard/admin/users"
        name="Manage Users"
        icon={MdOutlineManageAccounts}
      />

      {/* Manage Surveys */}
      <DynamicNavLinks
        address="/dashboard/admin/surveys"
        name="Manage Surveys"
        icon={FcSurvey}
      />

      {/* Manage Payments */}
      <DynamicNavLinks
        address="/dashboard/admin/payments"
        name="Payments & Survey Responses"
        icon={GiTakeMyMoney}
      />
    </>
  );
};

export default AdminMenus;
