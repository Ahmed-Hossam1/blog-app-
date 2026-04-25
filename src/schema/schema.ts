import * as yup from "yup";


// loginForm schema
export const getLoginSchema = (t: any) => yup.object({
  email: yup.string().required(t("validation.emailRequired")).email(t("validation.emailInvalid")),
  password: yup.string().required(t("validation.passwordRequired")),
});

// signUpForm schema
export const getSignUpSchema = (t: any) => yup.object({
  name: yup.string().required(t("validation.nameRequired")).min(3, t("validation.nameMin")).max(20, t("validation.nameMax")).matches(/^[a-zA-Z\s]+$/, t("validation.nameLetters")),
  email: yup.string().required(t("validation.emailRequired")).email(t("validation.emailInvalid")).matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, t("validation.emailFormat")),
  password: yup.string().required(t("validation.passwordRequired")).min(6, t("validation.passwordMin")).max(20, t("validation.passwordMax")),
})

// contactForm schema
export const getContactSchema = (t: any) => yup.object({
  name: yup.string().required(t("validation.nameRequired")).min(3, t("validation.nameMin")).max(20, t("validation.nameMax")),
  email: yup.string().required(t("validation.emailRequired")).email(t("validation.emailInvalid")).matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, t("validation.emailFormat")),
  message: yup.string().required(t("validation.messageRequired")),
});

// forgotPassword Page schema
export const getForgotPasswordSchema = (t: any) => yup.object({
  email: yup.string().required(t("validation.emailRequired")).email(t("validation.emailInvalid")).matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, t("validation.emailFormat")),
});

// resetPassword Page schema
export const getResetPasswordSchema = (t: any) => yup.object({
  password: yup.string().required(t("validation.passwordRequired")).min(6, t("validation.passwordMin")).max(20, t("validation.passwordMax")),
  confirmPassword: yup.string().required(t("validation.confirmPasswordRequired")).oneOf([yup.ref("password")], t("validation.passwordsMustMatch")),
});

// createBlog Page schema
export const getCreateBlogSchema = (t: any) => yup.object({
  title: yup.string().required(t("validation.titleRequired")),
  image: yup.mixed<string | FileList | File[]>().required(t("validation.imageRequired")),
  content: yup.string().required(t("validation.contentRequired")).min(20, t("validation.contentMin")),
  category: yup.string().required(t("validation.categoryRequired")),
});

// updateProfile Page schema
export const getUpdateProfileSchema = (t: any) => yup.object({
  name: yup.string().required(t("validation.nameRequired")).min(3, t("validation.nameMin")).max(40, t("validation.nameMax")).matches(/^[a-zA-Z\s]+$/, t("validation.nameLetters")),
  title: yup.string().required(t("validation.titleRequired")).min(2, t("validation.titleMin")),
  bio: yup.string().default(""),
});

// updateEmail  schema
export const getUpdateEmailSchema = (t: any) => yup.object({
  email: yup.string().required(t("validation.emailRequired")).email(t("validation.emailInvalid")).matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, t("validation.emailFormat")),
});

// updatePassword schema
export const getUpdatePasswordSchema = (t: any) => yup.object({
  oldPassword: yup.string().required(t("validation.oldPasswordRequired")),
  newPassword: yup.string().required(t("validation.passwordRequired")).min(6, t("validation.passwordMin")),
  confirmPassword: yup.string().required(t("validation.confirmPasswordRequired")).oneOf([yup.ref("newPassword")], t("validation.passwordsMustMatch")),
});
