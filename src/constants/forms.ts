import {
  IContactForm,
  IField,
  INewBlogForm,
  IProfileForm,
  ISignInForm,
  ISignUpForm,
} from "@/types";

export const formConfig = {
  signIn: [
    {
      id: "email",
      name: "email",
      type: "email",
      placeholder: "Email",
    },
    {
      id: "password",
      name: "password",
      type: "password",
      placeholder: "Password",
    },
  ] as IField<ISignInForm>[],

  signUp: [
    {
      id: "name",
      name: "name",
      placeholder: "Name",
      type: "text",
    },
    {
      id: "email",
      name: "email",
      type: "email",
      placeholder: "Email",
    },
    {
      id: "password",
      name: "password",
      type: "password",
      placeholder: "Password",
    },
  ] as IField<ISignUpForm>[],

  contactForm: [
    {
      id: "name",
      name: "name",
      placeholder: "John Doe",
      type: "text",
      label: "Your Name",
    },
    {
      id: "email",
      name: "email",
      type: "email",
      placeholder: "John@example.com",
      label: "Email Address",
    },
    {
      id: "message",
      name: "message",
      type: "textarea",
      placeholder: "Write Your Message Here...",
      label: "Message",
    },
  ] as IField<IContactForm>[],

  content: [
    {
      id: "title",
      name: "title",
      placeholder: "Title",
      type: "text",
      label: "Title",
    },
    {
      id: "image",
      name: "image",
      type: "file",
      placeholder: "Upload Your Image Here...",
      label: "cover image",
    },
    {
      id: "content",
      name: "content",
      type: "textarea",
      placeholder: `# Start writing your article...

## Headings
# H1
## H2
### H3

## Text Formatting
**bold**
*italic*
~~strikethrough~~

## Lists
- Item 1
- Item 2
1. First
2. Second

## Code
\`\`\`ts
console.log("Hello world")
\`\`\`

## Links
[Google](https://google.com)

> Blockquote

Happy writing 🚀`,
      label: "Content",
    },
  ] as IField<INewBlogForm>[],

  settings: [
    {
      id: "category",
      name: "category",
      placeholder: "Category",
      type: "select",
      label: "Category",
      options: [
        {
          name: "Mobile Development",
          value: "Mobile Development",
        },
        {
          name: "Web Development",
          value: "Web Development",
        },
        {
          name: "UI/UX",
          value: "UI/UX",
        },
      ],
    },
  ] as IField<INewBlogForm>[],

  profileForm: [
    {
      id: "name",
      name: "name",
      placeholder: "John Doe",
      type: "text",
      label: "Display Name",
    },
    {
      id: "title",
      name: "title",
      placeholder: "Software Engineer",
      type: "text",
      label: "Job Title",
    },
    {
      id: "bio",
      name: "bio",
      placeholder: "Tell us a bit about yourself...",
      type: "textarea",
      label: "Bio",
    },
  ] as IField<IProfileForm>[],
};
