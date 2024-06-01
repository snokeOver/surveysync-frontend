import { NavLink } from "react-router-dom";

import PageHelmet from "../components/shared/PageHelmet";
import PrimaryButton from "../components/shared/PrimaryButton";
const NotFound = () => {
  return (
    <>
      <PageHelmet pageName="Not Found" />
      <div className=" xl:my-20 container bg-base-100 m-auto p-5 md:p-10 min-h-screen">
        <div className="hero py-10 rounded-lg bg-base-200">
          <div className="hero-content text-center">
            <div className="max-w-md">
              <div>
                <img
                  className=""
                  src="https://i.ibb.co/cY9kysS/404.png"
                  alt=""
                />
              </div>

              <h3 className="text-5xl font-bold -mt-10">Not Found</h3>

              <p className="py-6">
                The page your are looking for was not found!
              </p>

              <NavLink to="/">
                <PrimaryButton text="Go Home" />
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
