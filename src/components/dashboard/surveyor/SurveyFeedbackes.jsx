import { useState } from "react";
import SingleFeedbackRow from "./SingleFeedbackRow";
import SingleFeedback from "./SingleFeedback";
import InitialPageStructure from "../shared/InitialPageStructure";
import useGetData from "../../../hooks/useGetData";

const SurveyFeedbackes = () => {
  const {
    data: adminFeedbacks,
    isPending,
    error,
  } = useGetData({ apiRoute: "admin-feedbacks" });

  const [openModal, setOpenModal] = useState(false);
  const [currFeedback, setCurrFeedback] = useState([]);

  //   Hanlde update Survey
  const handleShowFeedbacks = (feedback) => {
    setOpenModal(true);
    setCurrFeedback(feedback.adminFeedbacks);
  };
  return (
    <InitialPageStructure
      pageName="Admin Feedbacks"
      pageTitle="All Feedbacks Given By Admin"
      error={error}
      isPending={isPending}
      data={adminFeedbacks}
      emptyDataMsg="No Feedbacks From Admin Yet!"
      totalName="Feedback"
    >
      {/* Table section */}
      <div className="  mx-auto">
        {adminFeedbacks.length > 0 && (
          <div className="card w-full  shadow-2xl bg-base-100">
            {/* Table for cart */}
            <div className="overflow-x-auto py-7  bg-base-300">
              <table className="table">
                {/* head */}
                <thead>
                  <tr className="text-left text-lg">
                    <th></th>
                    <th>Survey Title</th>
                    <th>Last Updated</th>
                    <th>Feedbacks</th>
                    <th>Current Status</th>
                    <th>Actions</th>
                  </tr>
                  <tr>
                    <th colSpan="6">
                      <div className="divider -my-3"></div>
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {adminFeedbacks.map((singleFeedback, index) => (
                    <SingleFeedbackRow
                      index={index}
                      key={singleFeedback._id}
                      singleFeedback={singleFeedback}
                      handleShowFeedbacks={handleShowFeedbacks}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* modal to update Survey */}
      <dialog
        id="spot_update_modal"
        className={`modal ${openModal ? "modal-open" : ""} `}
      >
        <div
          id="form-modal"
          className="modal-box w-11/12 max-w-3xl bg-base-200"
        >
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button
              onClick={() => setOpenModal(false)}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>
          </form>
          <div>
            <h2 className="text-2xl text-center font-semibold mb-5">
              All Admin Feedbacks
            </h2>
          </div>
          <div className="w-full md:w-[90%] mx-auto flex flex-col gap-4">
            {currFeedback.length > 0 &&
              currFeedback.map((adminFeedback, index) => (
                <SingleFeedback
                  index={index}
                  key={adminFeedback.createdAt}
                  adminFeedback={adminFeedback}
                />
              ))}
          </div>
        </div>
      </dialog>
    </InitialPageStructure>
  );
};

export default SurveyFeedbackes;
