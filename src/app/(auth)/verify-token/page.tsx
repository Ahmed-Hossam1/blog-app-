"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const VerifyToken = () => {
  const token = useSearchParams().get("token");
  const router = useRouter();

  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading",
  );

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const res = await fetch(`/api/auth/verify-token`, {
          method: "POST",
          body: JSON.stringify({ token }),
        });

        const json = await res.json();

        if (!res.ok) throw new Error(json.message);

        setStatus("success");
        setTimeout(() => {
          router.push("/sign-in");
        },1200)
      } catch (error) {
        console.log(error);
        setStatus("error");
      }
    };

    if (token) verifyToken();
  }, [token , router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-baseInk px-4 transition-colors duration-300">
      <div className="bg-white dark:bg-surfaceDark shadow-xl rounded-2xl p-8 max-w-md w-full text-center transition-colors duration-300">
        {/* Loading */}
        {status === "loading" && (
          <>
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-500 border-t-transparent mx-auto mb-6"></div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
              Verifying your email...
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Please wait a moment</p>
          </>
        )}

        {/* Success */}
        {status === "success" && (
          <>
            <div className="text-green-500 text-5xl mb-4">✅</div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
              Email Verified!
            </h2>
            <div className="flex flex-col items-center gap-2">
              <p className="text-gray-700 dark:text-gray-300 text-lg font-semibold tracking-wide">
                Redirecting you...
              </p>
              <span className="text-sm text-gray-400 animate-pulse">
                Please wait a moment
              </span>
            </div>
          </>
        )}

        {/* Error */}
        {status === "error" && (
          <>
            <div className="text-red-500 text-5xl mb-4">❌</div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
              Verification Failed
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              The link is invalid or expired.
            </p>

            <button
              onClick={() => router.push("/sign-up")}
              className="mt-6 w-full bg-gray-800 hover:bg-gray-900 dark:bg-white dark:text-black dark:hover:bg-gray-200 text-white py-2 rounded-lg font-medium transition"
            >
              Try Again
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyToken;
