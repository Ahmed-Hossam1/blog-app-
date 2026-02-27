import {
  IContactForm,
  IField,
  INewBlogForm,
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
};

export const newBlogForm: Record<string, IField<INewBlogForm>[]> = {
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
  ],

  settings: [
    {
      id: "status",
      name: "status",
      placeholder: "Status",
      type: "select",
      label: "Status",
      options: [
        {
          name: "Published",
          value: "published",
        },
        {
          name: "Draft",
          value: "draft",
        },
      ],
    },

    {
      id: "publishDate",
      name: "publishDate",
      placeholder: "Publish Date",
      type: "date",
      label: "Publish Date",
    },
    {
      id: "category",
      name: "category",
      placeholder: "Category",
      type: "select",
      label: "Category",
      options: [
        {
          name: "Category 1",
          value: "category-1",
        },
        {
          name: "Category 2",
          value: "category-2",
        },
      ],
    },
  ],
};
