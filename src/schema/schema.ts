import * as yup from "yup";


// loginForm schema
export const loginSchema = yup.object({
  email: yup.string().required("Email is required").email("Invalid email"),
  password: yup.string().required("Password is required"),
});

// signUpForm schema
export const signUpSchema = yup.object({
  name: yup.string().required("Name is required").min(3).max(20).matches(/^[a-zA-Z\s]+$/, "Name must contain only letters and spaces"),
  email: yup.string().required("Email is required").email("Invalid email").matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid email format"),
  password: yup.string().required("Password is required").min(6).max(20),
})

// contactForm schema
export const contactSchema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().required("Email is required").email("Invalid email").matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid email format"),
  message: yup.string().required("Message is required"),
});

// forgotPassword Page schema
export const forgotPasswordSchema = yup.object({
  email: yup.string().required("Email is required").email("Invalid email").matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid email format"),
});

// resetPassword Page schema
export const resetPasswordSchema = yup.object({
  password: yup.string().required("Password is required").min(6, "Password must be at least 6 characters").max(20, "Password can't be more than 20 characters"),
  confirmPassword: yup.string().required("Please confirm your password").oneOf([yup.ref("password")], "Passwords must match"),
});

  // createBlog Page schema
export const createBlogSchema = yup.object({
  title: yup.string().required("Title is required").min(5, "Title must be at least 5 characters"),
  image: yup.mixed<string | FileList | File[]>().required("Cover image is required"),
  content: yup.string().required("Content is required").min(20, "Content must be at least 20 characters"),
  category: yup.string().required("Category is required"),
});

// updateProfile Page schema
export const updateProfileSchema = yup.object({
  name: yup.string().required("Name is required").min(3, "Name must be at least 3 characters").max(40, "Name can't be more than 40 characters").matches(/^[a-zA-Z\s]+$/, "Name must contain only letters and spaces"),
  title: yup.string().required("Job Title is required").min(2, "Title must be at least 2 characters"),
  bio: yup.string().default(""),
});

// updateEmail  schema
export const updateEmailSchema = yup.object({
  email: yup.string().required("Email is required").email("Invalid email").matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid email format"),
});

// updatePassword schema
export const updatePasswordSchema = yup.object({
  oldPassword: yup.string().required("Old password is required"),
  newPassword: yup.string().required("New password is required").min(6, "Password must be at least 6 characters"),
  confirmPassword: yup.string().required("Please confirm your password").oneOf([yup.ref("newPassword")], "Passwords must match"),
});
