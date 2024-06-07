import SingleUserRow from "./SingleUserRow";
import useUpdateData from "../../../hooks/useUpdateData";
import { useState } from "react";
import ActionButton from "../../shared/ActionButton";
import useGetData from "../../../hooks/useGetData";
import InitialPageStructure from "../shared/InitialPageStructure";

const SurveyResponses = () => {
  const {
    data: allUsers,
    isPending,
    error,
  } = useGetData({ apiRoute: "all-users" });

  const updateUserRole = useUpdateData();

  const [currRole, setCurrRole] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [currUserName, setCurrUserName] = useState("");
  const [currUserId, setCurrUserId] = useState("");

  // handle the Update initiation
  const handleUpdateRoleInitiate = (id, role, name) => {
    setCurrRole(role);
    setCurrUserName(name);
    setCurrUserId(id);
    setOpenModal(true);
  };

  // handle Update user role
  const handleUpdateUserRole = async () => {
    const payload = { userRole: currRole };

    await updateUserRole(
      currUserId,
      "Role",
      "update-user-role",
      payload,
      "noSkip",
      "all-users"
    );
  };

  return (
    <InitialPageStructure
      pageName="Manage User"
      pageTitle="All registered user"
      error={error}
      isPending={isPending}
      data={allUsers}
      emptyDataMsg="No Users Registered Yet!"
      totalName="User"
    >
      {/* Table section */}
      <div className="  mx-auto">
        {allUsers.length > 0 && (
          <div className="card w-full  shadow-2xl bg-base-100">
            {/* Table for cart */}
            <div className="overflow-x-auto py-7  bg-base-300">
              <table className="table">
                {/* head */}
                <thead>
                  <tr className="text-left text-lg">
                    <th>#</th>
                    <th>Email</th>
                    <th>Name</th>
                    <th>Id</th>
                    <th>Role</th>
                    <th>Actions</th>
                  </tr>
                  <tr>
                    <th colSpan="6">
                      <div className="divider -my-3"></div>
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {allUsers.map((singleUser, index) => (
                    <SingleUserRow
                      index={index}
                      key={singleUser._id}
                      singleUser={singleUser}
                      handleUpdateRoleInitiate={handleUpdateRoleInitiate}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

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
                {currUserName || currUserId}
              </span>
            </h2>
          </div>
          <div className="w-[80%] xl:w-[70%] mx-auto mt-10">
            <div className="flex justify-center">
              <select
                value={currRole}
                onChange={(e) => setCurrRole(e.target.value)}
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
              onClick={handleUpdateUserRole}
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
