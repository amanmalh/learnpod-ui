import React, { useState } from "react";
import { getGoal } from "./utils/api-utils";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

const Goal = () => {
  const [showTaskPanel, setShowTaskPanel] = useState(false);
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

  return (
    <>
      {query.isSuccess && (
        <div className="flex">
          <div className={`${showTaskPanel ? "basis-3/5" : "basis-full"}`}>
            <h1 className="text-2xl">
              {query.data.attributes.title}{" "}
              <span className="badge badge-primary">goal</span>
            </h1>
            <p className="mt-2">{query.data.attributes.description}</p>
            <h2 className="text-xl mt-3">Topics</h2>
            <div className="mt-3">
              {query.data.attributes.topics &&
                query.data.attributes.topics.data.map((topic) => (
                  <div
                    key={topic.id}
                    className="bg-neutral-100 p-3 rounded-md hover:bg-neutral-200 text-slate-600	mt-2 cursor-pointer flex justify-between"
                    onClick={topicClickHandler}
                  >
                    <span>{topic.attributes.title}</span>
                    <div>
                      {topic.attributes.owner.data.attributes.username ===
                        "amanmalh" && (
                        <span className="badge badge-secondary badge-outline">
                          owner
                        </span>
                      )}
                      {topic.attributes.owner.data.attributes.username !==
                        "amanmalh" && (
                        <span className="badge badge-accent badge-outline">
                          participant
                        </span>
                      )}
                      <span className="badge badge-accent badge-outline ml-2">
                        {topic.attributes.status}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
            <br />
            <button className="btn btn-primary" onClick={addTopicClickHandler}>
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
        </div>
      )}
    </>
  );
};

export default Goal;
