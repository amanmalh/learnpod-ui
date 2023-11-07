import React from "react";

export default function GoalSideBar({
  topic,
  closeTasksHandler,
  editTopicClickHandler,
  deleteTopicClickHandler,
}) {
  return (
    <>
      <div className="h-screen">
        <div className="flex justify-between">
          <h2 className="text-2xl">{topic.attributes.title}</h2>
          <div>
            {/* TODO: Avoid duplication */}
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
                    <span onClick={editTopicClickHandler}>Edit</span>
                  </li>
                  <li onClick={deleteTopicClickHandler}>
                    <span className="text-red-600">Delete</span>
                  </li>
                </ul>
              </div>
            </span>
            <button
              className="btn btn-sm btn-circle ml-4"
              onClick={closeTasksHandler}
            >
              ✕
            </button>
          </div>
        </div>
        <h3 className="text-lg mt-2">Pending Tasks</h3>
        <h3 className="text-lg mt-2">Completed Tasks</h3>
      </div>
    </>
  );
}
