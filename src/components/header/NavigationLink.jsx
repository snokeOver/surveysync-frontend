import { NavLink, useLocation } from "react-router-dom";

const NavigationLink = ({ destination, name, nested }) => {
  const { pathname } = useLocation();
  return (
    <li className="relative">
      <NavLink
        className={({ isActive }) =>
          `${
            isActive ? "text-prime" : "hover:text-prime"
          } mr-1 dark:text-gray-100`
        }
        to={`${destination}`}
      >
        {name}
      </NavLink>
      {pathname === destination ? (
        <div
          className={`absolute w-full h-[1px]  py-0 rounded-none bg-prime bottom-0  ${
            nested === "true" ? "lg:h-[1.3px] lg:-bottom-[0px]" : ""
          }`}
        ></div>
      ) : null}
    </li>
  );
};

export default NavigationLink;
