import { NavLink } from "react-router-dom";

import RingLoading from "../shared/RingLoading";
import NavigationLink from "./NavigationLink";
import SubNavLink from "./SubNavLink";
import SiteName from "../shared/SiteName";

const Navbar = () => {
  const user = {};
  const loading = false;
  const pageLoading = false;

  const fallbackPPUrl = "https://i.ibb.co/vxg6nY4/user.png";

  // fallback for Profile image to show default image
  const handleImageError = (event) => {
    event.target.src = "https://i.ibb.co/vxg6nY4/user.png";
  };

  // Handle LogOut operation
  const handleLogOut = () => {};

  // All the navlinks
  const navItems = (
    <>
      {/* Home link */}

      <NavigationLink destination="/" name="Home" nested="false" />

      {/* Survey link */}

      <NavigationLink destination="/surveys" name="Surveys" nested="false" />

      {/* Company link */}
      <li>
        <details>
          <summary className="dark:text-gray-100">Company</summary>
          <ul className="p-2 rounded-t-none rounded-b-md z-50">
            {/* About Link */}

            <NavigationLink destination="/about" name="About" nested="true" />

            {/* Contact Link */}

            <NavigationLink
              destination="/contact"
              name="Contact"
              nested="true"
            />
          </ul>
        </details>
      </li>

      {loading || pageLoading ? (
        <RingLoading />
      ) : (
        <>
          {user && (
            <>
              {/* Dashboard link */}
              <NavigationLink
                destination="/dashboard"
                name="Dashboard"
                nested="false"
              />
            </>
          )}
        </>
      )}
    </>
  );

  return (
    <div className="navbar py-0">
      {/* Start part */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navItems}
          </ul>
        </div>
        {/* Logo Part */}
        <div>
          <NavLink
            className="text-3xl font-semibold font-rubik flex items-center"
            to="/"
          >
            <img src="/logo.svg" alt="" className="w-12 mr-1" />

            <div className="hidden md:flex ">
              <SiteName />
            </div>
          </NavLink>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navItems}</ul>
      </div>
      {/* Navbar End */}
      <div className="navbar-end">
        {/* Here the theme toggle button component */}
        {loading || pageLoading ? (
          <RingLoading />
        ) : user ? (
          <>
            {/* New avatar */}
            <div className="dropdown dropdown-end ml-1">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-8 rounded-full">
                  <img
                    alt="User Photo"
                    src={user.photoURL || fallbackPPUrl}
                    onError={handleImageError}
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                <div className="flex flex-col gap-1 text-xs ml-3">
                  <h3> {user.displayName}</h3>
                  <h3 className="mt-1"> {user.email || "<Private_Email>"}</h3>
                </div>
                <div className="divider my-1"></div>
                {/* Profile link */}
                <SubNavLink
                  destination="/user-profile"
                  name="Profile"
                  badgeValue="New"
                />

                {/* Dashboard link */}
                <SubNavLink destination="/dashboard" name="Dashboard" />

                <li
                  onClick={handleLogOut}
                  className="bg-sky-400 hover:bg-sky-600 text-gray-100 rounded-2xl mt-4"
                >
                  <a>Logout</a>
                </li>
              </ul>
            </div>
            <a
              onClick={handleLogOut}
              className="btn border bg-transparent hover:bg-transparent  hover:border-prime hover:text-sky-800 dark:hover:text-gray-100 border-prime py-2 px-3 rounded-sm  text-prime btn-sm ml-2"
            >
              Logout
            </a>
          </>
        ) : (
          <>
            <NavLink to="/join" className="mx-2">
              <button className=" p-0 text-prime bg-transparent  hover:text-sky-700 dark:hover:text-gray-100 dark:hover:border-indigo-500">
                Join
              </button>
            </NavLink>
            <NavLink to="/login">
              <button className="btn py-2 md:py-3 md:px-7 rounded-sm text-gray-100 border-none bg-prime hover:bg-gray-200 hover:text-prime">
                Login
              </button>
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
