import React, { useState } from "react";
import { getGoal } from "../../utils/api-utils";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog";
import EditGoalDialog from "./EditGoalDialog";
import EditTopicDialog from "../topic/EditTopicDialog";
import GoalSideBar from "./GoalSideBar";
import ConfirmDeleteTopicDialog from "../topic/ConfirmDeleteTopicDialog";
import WarningIcon from "../common/WarningIcon";

const Goal = () => {
  const [showTaskPanel, setShowTaskPanel] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState(null);

  const { id } = useParams();
  const query = useQuery(["goal", id, true], getGoal);

  const addTopicClickHandler = () => {
    setSelectedTopic(null);
    document.getElementById("edit-topic-modal").showModal();
  };

  const topicClickHandler = (topic) => {
    return () => {
      console.log(topic);
      setShowTaskPanel(true);
      setSelectedTopic(topic);
    };
  };

  const closeTasksHandler = () => {
    setShowTaskPanel(false);
  };

  const deleteGoalClickHandler = () => {
    document.getElementById("confirm-delete-goal").showModal();
  };

  const editGoalClickHandler = () => {
    document.getElementById("edit-goal-modal").showModal();
  };

  const editTopicClickHandler = () => {
    document.getElementById("edit-topic-modal").showModal();
  };

  const deleteTopicClickHandler = () => {
    document.getElementById("confirm-delete-topic").showModal();
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
                      <span onClick={editGoalClickHandler}>Edit</span>
                    </li>
                    <li onClick={deleteGoalClickHandler}>
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
                <WarningIcon />
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
                    onClick={topicClickHandler(topic)}
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
          </div>
          {showTaskPanel && (
            <>
              {/* <div className="divider lg:divider-horizontal"></div> */}
              <div className="basis-2/5 ml-10 shadow-xl p-10">
                <GoalSideBar
                  topic={selectedTopic}
                  closeTasksHandler={closeTasksHandler}
                  editTopicClickHandler={editTopicClickHandler}
                  deleteTopicClickHandler={deleteTopicClickHandler}
                />
              </div>
            </>
          )}

          <ConfirmDeleteDialog
            id={query.data.id}
            goalTitle={query.data.attributes.title}
          />
          <EditGoalDialog existingGoal={query.data} />
          <EditTopicDialog
            goalId={query.data.id}
            existingTopic={selectedTopic}
          />
          <ConfirmDeleteTopicDialog id={selectedTopic && selectedTopic.id} />
        </div>
      )}
    </>
  );
};

export default Goal;
