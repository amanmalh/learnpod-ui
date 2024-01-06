import * as Yup from "yup";

export const editGoalValidationSchema = Yup.object({
  title: Yup.string()
    .required("Goal must have a title")
    .min(5, "Title must have at least 5 characters")
    .max(50, "Title can have at most 20 characters"),

  description: Yup.string()
    .required("Goal must have description")
    .min(5, "Description must have at least 5 characters")
    .max(300, "Description can have at most 300 characters"),
});
