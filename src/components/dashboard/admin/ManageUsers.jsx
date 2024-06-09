import SingleUserRow from "./SingleUserRow";
import useUpdateData from "../../../hooks/useUpdateData";
import { useState } from "react";
import ActionButton from "../../shared/ActionButton";
import useGetData from "../../../hooks/useGetData";
import InitialPageStructure from "../shared/InitialPageStructure";
import TableViewStructure from "../shared/TableViewStructure";
import useAuth from "../../../hooks/useAuth";
import useData from "../../../hooks/useData";

const SurveyResponses = () => {
  const { user } = useAuth();
  const { setToastMsg } = useData();
  const {
    data: allUsers,
    isPending,
    error,
  } = useGetData({ apiRoute: "all-users" });

  const updateUserRole = useUpdateData();

  const [openModal, setOpenModal] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [currRole, setCurrRole] = useState("");

  // handle the Update initiation
  const handleUpdateRoleInitiate = (currUser) => {
    if (user.uid === currUser.userId) {
      return setToastMsg("err This Action Not Permitted !");
    }
    setCurrRole(currUser.userRole);
    setCurrentUser(currUser);
    setOpenModal(true);
  };

  // handle Update user role
  const handleUpdateUserRole = async (id = "", approve = "No") => {
    if (currentUser && currRole && currentUser.userRole === currRole) {
      return setToastMsg(`err User is already '${currRole}' !`);
    }
    let payload = {};
    if (approve === "YES") {
      payload = { userRole: "Surveyor", userRequest: "Approved" };
    } else {
      payload = { userRole: currentUser.userRole };
    }

    await updateUserRole(
      currentUser._id || id,
      "Role",
      "update-user-role",
      payload,
      "noSkip",
      "all-users"
    );
    setCurrRole(currentUser.userRole);
    setCurrentUser({});
  };

  return (
    <InitialPageStructure
      pageName="Manage User"
      pageTitle="All registered user"
      error={error}
      isPending={isPending}
      data={allUsers || []}
      emptyDataMsg="No Users Registered Yet!"
      totalName="User"
    >
      {/* Table section */}
      <TableViewStructure
        data={allUsers || []}
        tabCols={["Email", "Name", "User ID", "Role", "Status"]}
        actionBtnNumbers={2}
      >
        {allUsers &&
          allUsers.map((singleUser, index) => (
            <SingleUserRow
              index={index}
              key={singleUser._id}
              singleUser={singleUser}
              handleUpdateRoleInitiate={handleUpdateRoleInitiate}
              handleUpdateUserRole={handleUpdateUserRole}
            />
          ))}
      </TableViewStructure>

      {/* modal to update User Role */}
      <dialog className={`modal ${openModal ? "modal-open" : ""} `}>
        <div className="modal-box  bg-base-200 p-0 py-3">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button
              onClick={() => setOpenModal(false)}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>
          </form>
          <div className="">
            <h2 className="text-2xl text-center font-semibold mb-5 flex flex-col gap-3">
              <span>Update This User Role:</span>
              <span className="text-primary ml-3">
                {currentUser.name || currentUser.userId}
              </span>
            </h2>
          </div>
          <div className="w-[80%] xl:w-[70%] mx-auto mt-10">
            <div className="flex justify-center">
              <select
                value={currentUser.currRole}
                onChange={(e) =>
                  setCurrentUser((prevData) => ({
                    ...prevData,
                    userRole: e.target.value,
                  }))
                }
                className="select select-bordered w-full max-w-xs"
              >
                <option value="" disabled>
                  Select the user role
                </option>
                <option value="User">User</option>
                <option value="ProUser">ProUser</option>
                <option value="Surveyor">Surveyor</option>
                <option value="Admin">Admin</option>
              </select>
            </div>

            <div
              onClick={() => handleUpdateUserRole("NO")}
              className="form-control mt-16 mb-5  mx-auto"
            >
              <ActionButton buttonText="Update User Role" />
            </div>
          </div>
        </div>
      </dialog>
    </InitialPageStructure>
  );
};

export default SurveyResponses;
