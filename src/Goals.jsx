import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { getGoals } from "./utils/api-utils";
import { useNavigate } from "react-router-dom";
import NewGoal from "./NewGoal";

const Goals = () => {
  const navigate = useNavigate();

  const goals = useQuery(["goals"], getGoals);

  const openGoal = (goalId) => {
    return () => {
      console.log(`Opening goal: ${goalId}`);
      try {
        navigate(`/goal/${goalId}`);
      } catch (e) {
        console.log(e);
      }
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

      <NewGoal />
    </>
  );
};

export default Goals;
