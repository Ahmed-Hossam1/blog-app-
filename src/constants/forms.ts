import { ContactFields, IField, SignInFields, SignUpFields } from "@/types";

export const formConfig = {
  signIn: [
    {
      id: 1,
      name: "email",
      type: "email",
      placeholder: "Email",
    },
    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "Password",
    },
  ] as IField<SignInFields>[],

  signUp: [
    {
      id: 1,
      name: "name",
      placeholder: "Name",
      type: "text",
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Email",
    },
    {
      id: 3,
      name: "password",
      type: "password",
      placeholder: "Password",
    },
  ] as IField<SignUpFields>[],

  contactForm: [
    {
      id: 1,
      name: "name",
      placeholder: "John Doe",
      type: "text",
      label: "Your Name",
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "John@example.com",
      label: "Email Address",
    },
    {
      id: 3,
      name: "message",
      type: "textarea",
      placeholder: "Write Your Message Here...",
      label: "Message",
    },
  ] as IField<ContactFields>[],
};
