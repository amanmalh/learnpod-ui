import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { getGoals } from "./utils/api-utils";
import { useNavigate } from "react-router-dom";

const Goals = () => {
  const navigate = useNavigate();

  const goals = useQuery(["goals"], getGoals);

  const openGoal = (goalId) => {
    return () => {
      navigate(`/goal/${goalId}`);
    };
  };

  const handleNewGoalClick = () => {
    document.getElementById("create-goal-modal").showModal();
  };

  return (
    <>
      <div className="flex flex-row items-center justify-between">
        <h1 className="text-2xl">Goals</h1>
        <button className="btn btn-primary" onClick={handleNewGoalClick}>
          New Goal
        </button>
      </div>
      {goals.isSuccess && (
        <div className="mt-2 grid md:grid-cols-3 gap-4">
          {goals.data.map((goal) => (
            <div key={goal.id} className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <button
                  className="btn btn-sm card-title inline-block w-fit"
                  onClick={openGoal(goal.id)}
                >
                  {goal.attributes.title}
                </button>
                <p>{goal.attributes.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <dialog id="create-goal-modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-xl">New Goal</h3>
          <div className="pt-4 pb-4">
            <input
              type="text"
              placeholder="Goal title"
              className="input w-full input-bordered input-md"
            />
            <textarea
              className="textarea textarea-bordered w-full mt-3 h-24"
              placeholder="Bio"
            ></textarea>
          </div>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Create</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default Goals;
