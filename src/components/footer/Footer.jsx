import { Link, NavLink } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import SocialLinks from "../shared/SocialLinks";
import useData from "../../hooks/useData";

const Footer = () => {
  const { siteName, siteLogo } = useData();
  return (
    <footer className=" p-10 bg-blue-100 dark:bg-base-100 text-base-content rounded-t-[2rem] md:rounded-t-[3rem] lg:rounded-t-[3.5rem] border-t-[1px] border-primary ">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 ">
        {/* First part */}
        <div className="grid grid-cols-2 col-span-2">
          <div className="footer flex md:justify-center">
            <nav>
              <h6 className="footer-title">Company</h6>

              <NavLink className="link link-hover" to="/about">
                About Us
              </NavLink>
              <NavLink className="link link-hover" to="/contact">
                Contact
              </NavLink>
              <NavLink className="link link-hover" to="#">
                Testimony
              </NavLink>
              <NavLink className="link link-hover" to="#">
                Terms of use
              </NavLink>
            </nav>
          </div>
          <div className="footer flex md:justify-center">
            <nav>
              <h6 className="footer-title">Quick Links</h6>

              <NavLink className="link link-hover" to="/manage-posts">
                My Requests
              </NavLink>
              <NavLink className="link link-hover" to="/manage-posts">
                My Posts
              </NavLink>
              <NavLink className="link link-hover" to="/user-profile">
                Profile
              </NavLink>
              <NavLink className="link link-hover" to="#">
                Promotions
              </NavLink>
            </nav>
          </div>
        </div>

        {/* Second part */}
        <div className=" flex flex-col items-center gap-2">
          {/* Logo and Site Name part */}

          <div>
            <Link
              to="/"
              className="text-3xl font-semibold font-rubik flex justify-center flex-col items-center gap-2"
            >
              <div>
                <img src={siteLogo} alt="" className="w-12" />
              </div>
            </Link>
          </div>

          <nav className="flex flex-col items-center gap-4">
            <div>
              <a className=" cursor-pointer  flex items-center gap-2 mb-1">
                <FaPhoneAlt className="text-primary" />
                <span className="hover:text-primary">+(880) 15171-66682</span>
              </a>
              <a className=" cursor-pointer  flex items-center gap-2">
                <MdEmail className="text-primary" />
                <span className="hover:text-primary">snokeover@gmail.com</span>
              </a>
            </div>
            <div>
              <SocialLinks />
            </div>
          </nav>
        </div>
      </div>

      <div className="divider py-10"></div>
      {/* Last part */}
      <div className="footer footer-center">
        {/* Copy Write part */}
        <aside className="text-xs">
          <p>
            © {siteName} - {new Date().getFullYear()} - All right reserved
          </p>
        </aside>
      </div>
    </footer>
  );
};

export default Footer;
