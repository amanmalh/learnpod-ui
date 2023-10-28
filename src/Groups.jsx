import React from "react";
import { getGroups } from "./utils/api-utils";
import { useQuery } from "react-query";

const Groups = () => {
  const groupsQuery = useQuery(["groups", true], getGroups);
  console.log(groupsQuery);

  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-2xl mt-3">Groups</h2>
        <button className="btn btn-primary">Create Group</button>
      </div>
      {groupsQuery.isSuccess && (
        <div className="mt-3">
          {groupsQuery.data.length > 0 &&
            groupsQuery.data.map((group) => (
              <button
                key={group.id}
                className="btn block mt-4 flex justify-between"
              >
                <span>{group.attributes.name}</span>
                {group.attributes.admins.data.find(
                  (user) => user.attributes.username === "amanmalh"
                ) && (
                  <span className="badge badge-primary lowercase">admin</span>
                )}
              </button>
            ))}
        </div>
      )}
      <br />
    </>
  );
};

export default Groups;
