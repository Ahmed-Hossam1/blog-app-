import { ISignInForm, ISignUpErrors, ISignUpForm } from "@/types";

export function truncateText(text: string) {
  return text.length > 40 ? text.slice(0, 40) + "..." : text;
}

export function signInErrors(signInForm: ISignInForm) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const errors: ISignInForm = {
    email: "",
    password: "",
  };

  if (!signInForm.email.trim() || !emailRegex.test(signInForm.email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!signInForm.password.trim() || signInForm.password.length < 6) {
    errors.password =
      "Password is required and must be at least 6 characters long.";
  }

  return errors;
}

export function signUpErrors(signUpForm: ISignUpForm) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const errors: ISignUpErrors = {
    user_name: "",
    email: "",
    password: "",
    confirm_password: "",
  };

  if (!signUpForm.user_name.trim() || signUpForm.user_name.length < 3) {
    errors.user_name =
      "User name is required and must be at least 3 characters long.";
  }

  if (!signUpForm.email.trim() || !emailRegex.test(signUpForm.email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!signUpForm.password.trim() || signUpForm.password.length < 6) {
    errors.password =
      "Password is required and must be at least 6 characters long.";
  }

  if (signUpForm.password !== signUpForm.confirm_password) {
    errors.confirm_password = "Passwords do not match.";
  }
  return errors;
}
