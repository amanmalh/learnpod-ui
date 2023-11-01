import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "react-query";
import { postGoal } from "./utils/api-utils";

const NewGoal = () => {
  const client = useQueryClient();

  const mutation = useMutation(postGoal, {
    onSuccess: () => {
      client.invalidateQueries(["goals"]);
    },
  });
  const initialValues = {
    title: "",
    description: "",
  };

  const handleSubmit = (values) => {
    mutation.mutate(values);
    document.getElementById("create-goal-modal").close();
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
    <dialog id="create-goal-modal" className="modal">
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
                  disabled={mutation.isLoading}
                  className="btn"
                >
                  Create
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </dialog>
  );
};

export default NewGoal;
