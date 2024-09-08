import { useEffect, useState } from "react";
import Container from "../components/shared/Container";
import PageHelmet from "../components/shared/PageHelmet";
import useAuth from "../hooks/useAuth";
import { FaLock } from "react-icons/fa";
import useData from "../hooks/useData";
import { formatDateTime } from "../helper/helperFunction";
import ActionButton from "../components/shared/ActionButton";

const Profile = () => {
  const { userDetails, user, updateUser } = useAuth();
  const { setPageLoading, setToastMsg } = useData();

  const [firebaseError, setFirebaseError] = useState("");
  const [updateMsg, setUpdateMsg] = useState("");
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [profileUpdate, setProfileUpdate] = useState(false);
  const fallbackPPUrl = "https://i.ibb.co/vxg6nY4/user.png";

  const [formData, setFormData] = useState({
    name: user?.displayName || "",
    photoUrl: user?.photoURL || "",
  });

  // This should handle all the changes of different fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setBtnDisabled(false);
  };

  // handle Update profile section
  const handleUpdateProfile = (e) => {
    e.preventDefault();
    setPageLoading(true);
    updateUser(user, {
      displayName: formData.name,
      photoURL: formData.photoUrl,
    })
      .then((result) => {
        setFirebaseError("");
        setUpdateMsg("Profile updated successfully!");
        setProfileUpdate(true);
        setPageLoading(false);
      })
      .catch((err) => {
        setFirebaseError(err.code);
        setUpdateMsg("");
        setPageLoading(false);
      });
  };

  // handle error and success message & toast
  useEffect(() => {
    if (firebaseError) {
      setToastMsg(firebaseError);

      setFirebaseError("");
    }
    if (updateMsg) {
      setToastMsg(updateMsg);

      setUpdateMsg("");
    }
    setBtnDisabled(true);
  }, [firebaseError, updateMsg]);

  return (
    <>
      <PageHelmet pageName="Profile" />
      <Container>
        <div className="mx-auto ">
          <div className="h-36 w-36 mx-auto">
            <img src={user?.photoURL || fallbackPPUrl} alt="" />
          </div>

          <form onSubmit={handleUpdateProfile}>
            <div className="card bg-base-200 card-compact my-8  lg:w-1/2 mx-auto shadow-xl rounded-md ">
              {/* Email section */}
              <div className=" card-body grid grid-cols-3 px-5 items-center gap-4 ">
                <h3>Your Email:</h3>
                <div className="relative col-span-2">
                  <input
                    name="email"
                    readOnly
                    type="text"
                    placeholder={user?.email || "< Private_Email >"}
                    className="input input-md w-full max-w-xs  "
                  />
                  <FaLock className="text-lg absolute right-5 bottom-4 sm:right-20 md:right-48 lg:right-5 xl:right-24 2xl:right-48" />
                </div>
              </div>
              {/* Email Verification Statues */}
              <div className=" card-body grid grid-cols-3 px-5 items-center gap-4 ">
                <h3>Eamil Status:</h3>
                <div className="relative col-span-2">
                  <input
                    name="email"
                    readOnly
                    type="text"
                    placeholder={
                      user?.emailVerified ? "Verified" : "Not Vefied"
                    }
                    className="input input-md w-full max-w-xs  "
                  />
                  <FaLock className="text-lg absolute right-5 bottom-4 sm:right-20 md:right-48 lg:right-5 xl:right-24 2xl:right-48" />
                </div>
              </div>

              {/* Registered Date section */}
              <div className=" card-body grid grid-cols-3 px-5 items-center gap-4 ">
                <h3>Registerd At:</h3>
                <div className="relative col-span-2">
                  <input
                    name="email"
                    readOnly
                    type="text"
                    placeholder={formatDateTime(user?.metadata?.creationTime)}
                    className="input input-md w-full max-w-xs  "
                  />
                  <FaLock className="text-lg absolute right-5 bottom-4 sm:right-20 md:right-48 lg:right-5 xl:right-24 2xl:right-48" />
                </div>
              </div>

              {/* Last Login Date section */}
              <div className=" card-body grid grid-cols-3 px-5 items-center gap-4 ">
                <h3>Last Login:</h3>
                <div className="relative col-span-2">
                  <input
                    name="email"
                    readOnly
                    type="text"
                    placeholder={formatDateTime(user?.metadata?.lastSignInTime)}
                    className="input input-md w-full max-w-xs  "
                  />
                  <FaLock className="text-lg absolute right-5 bottom-4 sm:right-20 md:right-48 lg:right-5 xl:right-24 2xl:right-48" />
                </div>
              </div>
              <div className="card-body grid grid-cols-3 px-5 items-center gap-4 ">
                <h3>Your Name:</h3>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  type="text"
                  placeholder={user?.displayName}
                  className="input col-span-2 input-bordered  input-md w-full max-w-xs border-primary"
                />
              </div>

              <div className="card-body grid grid-cols-3  px-5 items-center gap-4">
                <h3>Photo Url:</h3>

                <input
                  name="photoUrl"
                  value={formData.photoUrl}
                  onChange={handleChange}
                  type="text"
                  placeholder={user?.photoURL}
                  className="input col-span-2 input-bordered  input-md w-full max-w-xs border-primary"
                />
              </div>
              <div className="card-body w-full md:w-[80%] mx-auto  px-5 items-center gap-4 mb-6">
                <ActionButton disabledStat={btnDisabled} buttonText="Update" />
              </div>
            </div>
          </form>
        </div>
      </Container>
    </>
  );
};

export default Profile;
