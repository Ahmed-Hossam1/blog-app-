import * as yup from "yup";
export const loginSchema = yup.object({
  email: yup.string().required("Email is required").email("Invalid email"),
  password: yup.string().required("Password is required").min(6).max(20),
});

export const signUpSchema = yup.object({
  name : yup.string().required("Name is required").min(3).max(20).matches(/^[a-zA-Z\s]+$/, "Name must contain only letters and spaces"),
  email: yup.string().required("Email is required").email("Invalid email"),
  password: yup.string().required("Password is required").min(6).max(20),
})
export const contactSchema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().required("Email is required").email("Invalid email"),
  message: yup.string().required("Message is required"),
});
