import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "react-query";
import { postTopic, putTopic } from "../../utils/api-utils";

const EditTopicDialog = ({ goalId, existingTopic }) => {
  const client = useQueryClient();

  const postMutation = useMutation(postTopic, {
    onSuccess: () => {
      client.invalidateQueries(["goal"]);
      document.getElementById("edit-topic-modal").close();
    },
  });

  const putMutation = useMutation(putTopic, {
    onSuccess: () => {
      client.invalidateQueries(["goal"]);

      document.getElementById("edit-topic-modal").close();
    },
  });

  let initialValues = {
    title: "",
    description: "",
  };

  if (existingTopic) {
    const { title, description } = existingTopic.attributes;
    initialValues = { title, description };
  }

  const handleSubmit = (values, { resetForm }) => {
    if (existingTopic) {
      putMutation.mutate({ id: existingTopic.id, body: values });
    } else {
      postMutation.mutate({ goalId, topic: values });
      resetForm();
    }
  };

  const validationSchema = Yup.object({
    title: Yup.string()
      .required("Topic must have a title")
      .min(5, "Title must have at least 5 characters")
      .max(50, "Title can have at most 20 characters"),

    description: Yup.string()
      .required("Topic must have bio")
      .min(5, "Bio must have at least 5 characters")
      .max(300, "Bio can have at most 300 characters"),
  });

  return (
    <dialog id="edit-topic-modal" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-xl">
          {existingTopic ? "Edit Topic" : "New Topic"}
        </h3>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
          enableReinitialize={true}
        >
          {(formik) => (
            <Form>
              <div className="pt-4 pb-4">
                <Field
                  name="title"
                  type="text"
                  placeholder="Title"
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
                  placeholder="Description"
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
                    <span className="loading loading-spinner text-primary"></span>
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

export default EditTopicDialog;
