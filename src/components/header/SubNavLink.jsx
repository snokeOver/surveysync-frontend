import { NavLink } from "react-router-dom";

const SubNavLink = ({ destination, name, badgeValue }) => {
  return (
    <li>
      <NavLink
        to={destination}
        className={({ isActive }) =>
          `${
            isActive ? "text-prime border-b border-prime" : "hover:text-prime "
          } w-full justify-between`
        }
      >
        {name} {badgeValue && <span className="badge">{badgeValue}</span>}
      </NavLink>
    </li>
  );
};

export default SubNavLink;
