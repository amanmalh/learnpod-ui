import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { deleteTopic } from "../../utils/api-utils";

const ConfirmDeleteTopicDialog = ({ id }) => {
  const client = useQueryClient();
  const deleteMutation = useMutation(deleteTopic, {
    onSuccess: () => {
      document.getElementById("confirm-delete-topic").close();
      client.invalidateQueries(["goal"]);
    },
  });

  const handleDeleteConfirmClick = () => {
    deleteMutation.mutate(id);
  };

  return (
    <dialog id="confirm-delete-topic" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Delete Topic</h3>
        <p className="py-4">
          Warning! This will permanently remove this topic. If you still wish to
          proceed, please click on the Delete button.
        </p>

        <div className="modal-action">
          <button onClick={handleDeleteConfirmClick} className="btn">
            {deleteMutation.isLoading && (
              <span className="loading loading-spinner text-primary"></span>
            )}
            Delete
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default ConfirmDeleteTopicDialog;
