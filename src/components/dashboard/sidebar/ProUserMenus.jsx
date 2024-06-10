import DynamicNavLinks from "./DynamicNavLinks";

import { FaRegMessage } from "react-icons/fa6";
import { BsGraphUp } from "react-icons/bs";

import { FcSurvey } from "react-icons/fc";
import { TbFileReport } from "react-icons/tb";

const ProUserMenus = () => {
  return (
    <>
      {/* Statistics */}
      <DynamicNavLinks
        address="/dashboard/user"
        name="ProUser Statistics"
        icon={BsGraphUp}
      />

      {/* Participated Surveys */}
      <DynamicNavLinks
        address="/dashboard/user/surveys"
        name="Participated Surveys"
        icon={FcSurvey}
      />

      {/* Reported Surveys */}
      <DynamicNavLinks
        address="/dashboard/user/my-reports"
        name="Reported Surveys"
        icon={TbFileReport}
      />
      {/* Create a survey */}
      <DynamicNavLinks
        address="/dashboard/user/comments"
        name="Commented Surveys"
        icon={FaRegMessage}
      />
    </>
  );
};

export default ProUserMenus;
