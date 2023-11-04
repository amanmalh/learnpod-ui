import React, { useState } from "react";
import { getGoal } from "../../utils/api-utils";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import EditGoalDialog from "./EditGoalDialog";

const Goal = () => {
  const [showTaskPanel, setShowTaskPanel] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);

  const { id } = useParams();
  const query = useQuery(["goal", id, true], getGoal);

  const addTopicClickHandler = () => {
    document.getElementById("create-topic-modal").showModal();
  };

  const topicClickHandler = () => {
    setShowTaskPanel(true);
  };

  const closeTasksHandler = () => {
    setShowTaskPanel(false);
  };

  const handleEditGoalDialogClick = () => {
    document.getElementById("edit-goal-modal").showModal();
  };

  return (
    <>
      {query.isSuccess && (
        <div className="flex">
          <div className={`${showTaskPanel ? "basis-3/5" : "basis-full"}`}>
            <div className="flex justify-between">
              <h1 className="text-2xl">{query.data.attributes.title}</h1>
              <span className="cursor-pointer">
                <div className="dropdown dropdown-end">
                  <label tabIndex={0} className="cursor-pointer">
                    <i className="fa-solid fa-ellipsis-vertical"></i>
                  </label>
                  <ul
                    tabIndex={0}
                    className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
                  >
                    <li>
                      <span onClick={handleEditGoalDialogClick}>Edit</span>
                    </li>
                    <li>
                      <span className="text-red-600">Delete</span>
                    </li>
                  </ul>
                </div>
              </span>
            </div>
            <p className="mt-2">{query.data.attributes.description}</p>
            <h2 className="text-xl mt-3">Topics</h2>

            {(!query.data.attributes.topics ||
              query.data.attributes.topics.data.length === 0) && (
              <div className="alert mt-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <span>
                  No topics present. Click on the below button to add one!
                </span>
              </div>
            )}

            <div className="mt-3">
              {query.data.attributes.topics &&
                query.data.attributes.topics.data.map((topic) => (
                  <div
                    key={topic.id}
                    className="bg-neutral-100 p-3 rounded-md hover:bg-neutral-200 text-slate-600 mt-2 cursor-pointer flex justify-between"
                    onClick={topicClickHandler}
                  >
                    <span>{topic.attributes.title}</span>
                  </div>
                ))}
            </div>
            <button
              className="btn btn-primary mt-2"
              onClick={addTopicClickHandler}
            >
              Add topic
            </button>
            <dialog id="create-topic-modal" className="modal">
              <div className="modal-box">
                <h3 className="font-bold text-xl">Add Topic</h3>
                <div className="pt-4 pb-4">
                  <input
                    type="text"
                    placeholder="Title"
                    className="input w-full input-bordered input-md"
                  />
                  <textarea
                    className="textarea textarea-bordered w-full mt-3 h-24"
                    placeholder="Description"
                  ></textarea>
                </div>
                <div className="modal-action">
                  <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn">Add</button>
                  </form>
                </div>
              </div>
            </dialog>
          </div>
          {showTaskPanel && (
            <div className="divider lg:divider-horizontal"></div>
          )}
          <div className={`h-screen ${showTaskPanel ? "basis-2/5" : "hidden"}`}>
            <div className="flex justify-between">
              <h2 className="text-2xl">Tasks</h2>
              <button
                className="btn btn-sm btn-circle"
                onClick={closeTasksHandler}
              >
                ✕
              </button>
            </div>
            <h3 className="text-lg mt-2">Pending Tasks</h3>
            <h3 className="text-lg mt-2">Completed Tasks</h3>
          </div>
          <EditGoalDialog existingGoal={query.data} />
        </div>
      )}
    </>
  );
};

export default Goal;
