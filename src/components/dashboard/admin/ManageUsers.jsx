import Container from "../../shared/Container";
import GoToTopBtn from "../../shared/GoToTopBtn";
import PageHelmet from "../../shared/PageHelmet";
import PageTitle from "../../shared/PageTitle";
import ButtonSpinner from "../../shared/ButtonSpinner";
import SingleUserRow from "./SingleUserRow";
import useUpdateData from "../../../hooks/useUpdateData";
import { useState } from "react";
import ActionButton from "../../shared/ActionButton";
import useGetAllData from "../../../hooks/useGetAllData";

const SurveyResponses = () => {
  const { data: allUsers, isPending, error } = useGetAllData("all-users");

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
    <>
      <PageHelmet pageName="Manage User" />
      <Container>
        <PageTitle title="All registered user" />

        <div className=" rounded-lg bg-base-100 pb-5 md:pb-10">
          {/* Handle error */}
          {error && <div>Error: {error.message}</div>}
          {/* handle pending time */}
          {isPending ? (
            <ButtonSpinner />
          ) : (
            <>
              <div className="text-center flex-col">
                <div className="text-center py-2">
                  {allUsers.length < 1 && (
                    <h1 className="text-xl lg:text-4xl font-bold py-10">
                      No Users Registered Yet !
                    </h1>
                  )}
                </div>
                {/* heading section */}
                <div className=" flex  items-center w-[90%] mx-auto gap-x-3 my-4">
                  <h2 className="text-lg  font-medium ">Total</h2>

                  <span className="px-3 py-1 text-xs text-gray-900 bg-blue-100 rounded-full ">
                    {allUsers.length}
                    <span className="ml-1"> User (s)</span>
                  </span>
                </div>
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
                                handleUpdateRoleInitiate={
                                  handleUpdateRoleInitiate
                                }
                              />
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
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
                      <span>Survey Title:</span>
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
                      <ActionButton buttonText="Update This User Role" />
                    </div>
                  </div>
                </div>
              </dialog>
            </>
          )}
        </div>
      </Container>
      <GoToTopBtn />
    </>
  );
};

export default SurveyResponses;
