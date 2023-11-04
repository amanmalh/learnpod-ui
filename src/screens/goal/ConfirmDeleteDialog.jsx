import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useMutation } from "react-query";
import { deleteGoal } from "../../utils/api-utils";
import { useNavigate } from "react-router-dom";

const ConfirmDeleteDialog = ({ id, goalTitle }) => {
  const navigate = useNavigate();
  const deleteMutation = useMutation(deleteGoal, {
    onSuccess: () => {
      document.getElementById("confirm-delete-goal").close();
      navigate("/");
    },
  });

  const initialValues = {
    confirmFieldTitle: "",
  };

  const handleSubmit = () => {
    deleteMutation.mutate(id);
  };

  const validate = (values) => {
    const error = {};
    if (values.confirmFieldTitle != goalTitle) {
      error.confirmFieldTitle = "Titles do not match!";
    }

    return error;
  };
  return (
    <dialog id="confirm-delete-goal" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Delete Goal</h3>
        <p className="py-4">
          Warning! This will permanently remove this goal. If you still wish to
          proceed, please type the name of the goal in the below input.
        </p>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validate={validate}
        >
          <Form className="flex flex-col">
            <Field
              type="text"
              name="confirmFieldTitle"
              placeholder="Goal Title"
              className="input input-md input-bordered w-full max-w-xs"
            />
            <ErrorMessage
              component="span"
              name="confirmFieldTitle"
              className="text-sm text-red-500"
            />
            <div className="modal-action">
              <button type="submit" className="btn">
                {deleteMutation.isLoading && (
                  <span className="loading loading-spinner text-primary"></span>
                )}
                Delete
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </dialog>
  );
};

export default ConfirmDeleteDialog;
