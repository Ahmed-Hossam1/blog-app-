import { IComment, ISignInForm, ISignUpForm } from "@/types";

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

  const errors: ISignUpForm = {
    name: "",
    email: "",
    password: "",
  };

  if (!signUpForm.name.trim() || signUpForm.name.length < 3) {
    errors.name = "name is required and must be at least 3 characters long.";
  }

  if (!signUpForm.email.trim() || !emailRegex.test(signUpForm.email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!signUpForm.password.trim() || signUpForm.password.length < 6) {
    errors.password =
      "Password is required and must be at least 6 characters long.";
  }
  return errors;
}

export function formatDate(date: Date | string) {
  const d = new Date(date);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/**
 * This function takes the flat array that back from prisma
 * and convert it to a tree structure because prisma return flat array like
 * [
 *   { id: 1, parentId: null },
 *   { id: 2, parentId: 1 },
 * ]
 *
 * and we need to convert it to a tree structure like
 * [
 *   { id: 1, parentId: null, replies: [
 *     { id: 2, parentId: 1, replies: [] },
 *   ] },
 *   { id: 2, parentId: 1, replies: [] },
 * ]
 * ]
 *
 * @param comments - The flat array that back from prisma
 * @return The tree structure of comments
 */
export function buildCommentsTree(comments: IComment[]) {
  const root: IComment[] = [];
  // add empty replies array in beginning to each comment
  comments.forEach((comments) => (comments.replies = []));

  comments.forEach((comment) => {
    if (comment.parentId === null) {
      root.push(comment);
    } else {
      const parent = comments.find((c) => c.id === comment.parentId);
      if (parent) {
        parent.replies!.push(comment);
      }
    }
  });
}
