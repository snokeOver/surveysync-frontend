import DynamicNavLinks from "./DynamicNavLinks";
import { BsGraphUp } from "react-icons/bs";

import { FcSurvey } from "react-icons/fc";
import { TbFileReport } from "react-icons/tb";

const UserMenus = () => {
  return (
    <>
      {/* Statistics */}
      <DynamicNavLinks
        address="/dashboard"
        name="Statistics"
        icon={BsGraphUp}
      />

      {/* Participated Surveys */}
      <DynamicNavLinks
        address="user/surveys"
        name="Participated Surveys"
        icon={FcSurvey}
      />

      {/* Reported Surveys */}
      <DynamicNavLinks
        address="user/my-reports"
        name="Reported Surveys"
        icon={TbFileReport}
      />
    </>
  );
};

export default UserMenus;
