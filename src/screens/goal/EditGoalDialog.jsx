import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "react-query";
import { postGoal, putGoal } from "../../utils/api-utils";

const EditGoal = ({ existingGoal }) => {
  const client = useQueryClient();

  const postMutation = useMutation(postGoal, {
    onSuccess: () => {
      client.invalidateQueries(["goals"]);
      document.getElementById("edit-goal-modal").close();
    },
  });

  const putMutation = useMutation(putGoal, {
    onSuccess: () => {
      client.invalidateQueries(["goals"]);
      client.invalidateQueries(["goal"]);
      document.getElementById("edit-goal-modal").close();
    },
  });

  let initialValues = {
    title: "",
    description: "",
  };

  if (existingGoal) {
    const { title, description } = existingGoal.attributes;
    initialValues = { title, description };
  }

  const handleSubmit = (values, { resetForm }) => {
    if (existingGoal) {
      putMutation.mutate({ id: existingGoal.id, body: values });
    } else {
      postMutation.mutate(values);
      resetForm();
    }
  };

  const validationSchema = Yup.object({
    title: Yup.string()
      .required("Goal must have a title")
      .min(5, "Title must have at least 5 characters")
      .max(20, "Title can have at most 20 characters"),

    description: Yup.string()
      .required("Goal must have bio")
      .min(5, "Bio must have at least 5 characters")
      .max(300, "Bio can have at most 300 characters"),
  });

  return (
    <dialog id="edit-goal-modal" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-xl">New Goal</h3>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {(formik) => (
            <Form>
              <div className="pt-4 pb-4">
                <Field
                  name="title"
                  type="text"
                  placeholder="Goal title"
                  className="input w-full input-bordered input-md"
                />
                <ErrorMessage
                  component="span"
                  name="title"
                  className="text-sm text-red-500"
                />
                <Field
                  name="description"
                  as="textarea"
                  placeholder="Bio"
                  className="textarea textarea-bordered w-full mt-3 h-24"
                />
                <ErrorMessage
                  component="span"
                  name="description"
                  className="text-sm text-red-500"
                />
              </div>
              <div className="modal-action">
                <button
                  type="submit"
                  disabled={postMutation.isLoading || putMutation.isLoading}
                  className="btn"
                >
                  {(putMutation.isLoading || postMutation.isLoading) && (
                    <span class="loading loading-spinner text-primary"></span>
                  )}
                  Save
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </dialog>
  );
};

export default EditGoal;
