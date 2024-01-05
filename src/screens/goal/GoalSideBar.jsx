import React from "react";
import WarningIcon from "../common/WarningIcon";

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
        {topic.attributes.tasks.data.length === 0 && (
          <div className="alert mt-3">
            <WarningIcon />
            <span>No tasks present. Click on the below button to add one!</span>
          </div>
        )}
        {topic.attributes.tasks.data.map((task) => (
          <div
            key={topic.id}
            className="bg-neutral-100 p-3 rounded-md hover:bg-neutral-200 text-slate-600 mt-2 cursor-pointer flex justify-between"
            onClick={() => {}}
          >
            <div className="flex">
              <input
                type="checkbox"
                name={task.attributes.title}
                className="checkbox checkbox-primary"
              />
              <span className="ml-2">{task.attributes.title}</span>
            </div>
          </div>
        ))}
        <button className="btn btn-default mt-2" onClick={() => {}}>
          Add task
        </button>
      </div>
    </>
  );
}
