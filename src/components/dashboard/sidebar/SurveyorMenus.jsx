import DynamicNavLinks from "./DynamicNavLinks";
import { GrLogout } from "react-icons/gr";
import { FcSettings } from "react-icons/fc";
import { BsFillHouseAddFill, BsFingerprint } from "react-icons/bs";
import { GrUserAdmin } from "react-icons/gr";
import { AiOutlineBars } from "react-icons/ai";
import { BsGraphUp } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import { MdHomeWork } from "react-icons/md";
import { FcSurvey, FcFeedback } from "react-icons/fc";

const SurveyorMenus = () => {
  return (
    <>
      {/* Statistics */}
      <DynamicNavLinks
        address="/dashboard"
        name="Statistics"
        icon={BsGraphUp}
      />

      {/* Create a survey */}
      <DynamicNavLinks
        address="surveyor/create"
        name="Create Survey"
        icon={FcSurvey}
      />

      {/* My Surveys */}
      <DynamicNavLinks
        address="surveyor/surveys"
        name="My Survey"
        icon={MdHomeWork}
      />

      {/* Admin Feedbacks */}
      <DynamicNavLinks
        address="surveyor/feedbacks"
        name="Admin Feedbacks"
        icon={FcFeedback}
      />
    </>
  );
};

export default SurveyorMenus;
