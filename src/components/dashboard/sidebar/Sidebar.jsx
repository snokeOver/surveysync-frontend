import { useState } from "react";
import { GrLogout } from "react-icons/gr";
import { FcSettings } from "react-icons/fc";
import { BsFillHouseAddFill, BsFingerprint } from "react-icons/bs";
import { GrUserAdmin } from "react-icons/gr";
import { AiOutlineBars } from "react-icons/ai";
import { BsGraphUp } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import { MdHomeWork } from "react-icons/md";
import { FcSurvey, FcFeedback } from "react-icons/fc";

import useAuth from "../../../hooks/useAuth";

const Sidebar = () => {
  const [isActive, setActive] = useState(false);
  const { userDetails } = useAuth();

  // Sidebar Responsive Handler
  const handleToggle = () => {
    setActive(!isActive);
  };
  return (
    <>
      {/* Small Screen Navbar */}
      <div className="bg-base-100  flex justify-between md:hidden">
        <div>
          <div className="block cursor-pointer p-4 font-bold"></div>
        </div>

        <button
          onClick={handleToggle}
          className="mobile-menu-button p-4 focus:outline-none focus:bg-primary"
        >
          <AiOutlineBars className="h-5 w-5" />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-base-100 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform top-[7.3rem] md:top-[4rem] ${
          isActive && "-translate-x-full"
        }  md:translate-x-0  transition duration-200 ease-in-out`}
      >
        <div>
          <div></div>

          {/* Nav Items */}
          <div className="flex flex-col justify-between flex-1 mt-6">
            {/* Conditional toggle button here.. */}

            {/*  Menu Items */}
            <nav>
              {/* Statistics */}
              <NavLink
                to="/dashboard"
                end
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-primary hover:text-gray-900 ${
                    isActive
                      ? "bg-primary  text-gray-800"
                      : "dark:text-gray-100 text-gray-900"
                  }`
                }
              >
                <BsGraphUp className="w-5 h-5" />

                <span className="mx-4 font-medium">Statistics</span>
              </NavLink>

              {/* Create a survey */}
              <NavLink
                to="surveyor/create"
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-primary   hover:text-gray-900 ${
                    isActive
                      ? "bg-primary  text-gray-800"
                      : "dark:text-gray-100 text-gray-900"
                  }`
                }
              >
                <FcSurvey className="w-5 h-5" />

                <span className="mx-4 font-medium">Create Survey</span>
              </NavLink>

              {/* My Surveys */}
              <NavLink
                to="surveyor/surveys"
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-primary   hover:text-gray-900 ${
                    isActive
                      ? "bg-primary  text-gray-800"
                      : "dark:text-gray-100 text-gray-900"
                  }`
                }
              >
                <MdHomeWork className="w-5 h-5" />

                <span className="mx-4 font-medium">My Surveys</span>
              </NavLink>

              {/* Admin Feedbacks */}
              <NavLink
                to="surveyor/feedbacks"
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-primary   hover:text-gray-900 ${
                    isActive
                      ? "bg-primary  text-gray-800"
                      : "dark:text-gray-100 text-gray-900"
                  }`
                }
              >
                <FcFeedback className="w-5 h-5" />

                <span className="mx-4 font-medium">Admin Feedbacks</span>
              </NavLink>
            </nav>
          </div>
        </div>

        <div>
          <div className="divider"></div>

          {/* Profile Menu */}
          <NavLink
            to="/dashboard/profile"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-primary   hover:text-gray-900 ${
                isActive
                  ? "bg-primary  text-gray-800"
                  : "dark:text-gray-100 text-gray-900"
              }`
            }
          >
            <FcSettings className="w-5 h-5" />

            <span className="mx-4 font-medium">Profile</span>
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
