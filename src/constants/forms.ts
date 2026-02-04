import { IField } from "@/types";

export const formConfig: Record<string, IField[]> = {
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
      placeholder: "password",
    },
  ],

  signUp: [
    {
      id: 1,
      name: "user_name",
      placeholder: "user name",
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
      placeholder: "password",
    },
    {
      id: 4,
      name: "confirm_password",
      type: "password",
      placeholder: "confirm password",
    },
  ],
};
