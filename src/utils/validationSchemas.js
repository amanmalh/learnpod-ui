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

export const loginValidationSchema = Yup.object({
  id: Yup.string().required("Email is required.").email(),
  password: Yup.string()
    .required("Password is required.")
    .min(8, "Password too short!")
    .max(30, "Password is too long!"),
  // .minLowercase(1, "Password must contain at least 1 lower case letter")
  // .minUppercase(1, "Password must contain at least 1 upper case letter")
  // .minNumbers(1, "Password must contain at least 1 number")
  // .minSymbols(1, "Password must contain at least 1 special character"),
});
