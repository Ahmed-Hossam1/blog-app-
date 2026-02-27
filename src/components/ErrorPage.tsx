"use client";

import Button from "@/components/ui/Button";
import Link from "next/link";
import { useEffect } from "react";

const ErrorPage = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-5xl font-bold mb-4 dark:text-white">
        Something went wrong
      </h1>

      <p className="text-gray-500 max-w-md mb-8 dark:text-gray-400">
        An unexpected error occurred. Please try again or come back later.
      </p>

      <div className="flex gap-4">
        <Button
          onClick={() => reset()}
          className="px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition dark:bg-white dark:text-black dark:hover:bg-gray-200"
        >
          Try again
        </Button>

        <Link
          href="/"
          className="px-6 py-3 border rounded-md hover:bg-baseInk hover:text-white transition dark:border-gray-600 dark:text-white dark:hover:bg-white dark:hover:text-black"
        >
          Go home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
