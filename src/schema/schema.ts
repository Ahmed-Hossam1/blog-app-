import * as yup from "yup";
export const loginSchema = yup.object({
  email: yup.string().required("Email is required").email("Invalid email"),
  password: yup.string().required("Password is required"),
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

export const forgotPasswordSchema = yup.object({
  email: yup.string().required("Email is required").email("Invalid email").matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid email format"),
});

export const resetPasswordSchema = yup.object({
  password: yup.string().required("Password is required").min(6, "Password must be at least 6 characters").max(20, "Password can't be more than 20 characters"),
  confirmPassword: yup.string().required("Please confirm your password").oneOf([yup.ref("password")], "Passwords must match"),
});