"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const VerifyToken = () => {
  const token = useSearchParams().get("token");
  const router = useRouter();

  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const res = await fetch(`/api/email/verify-token`, {
          method: "POST",
          body: JSON.stringify({ token }),
        });

        const json = await res.json();

        if (!res.ok) throw new Error(json.message);

        setStatus("success");
      } catch (error) {
        console.log(error);
        setStatus("error");
      }
    };

    if (token) verifyToken();
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full text-center">

        {/* Loading */}
        {status === "loading" && (
          <>
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-500 border-t-transparent mx-auto mb-6"></div>
            <h2 className="text-xl font-semibold text-gray-800">
              Verifying your email...
            </h2>
            <p className="text-sm text-gray-500 mt-2">
              Please wait a moment
            </p>
          </>
        )}

        {/* Success */}
        {status === "success" && (
          <>
            <div className="text-green-500 text-5xl mb-4">✅</div>
            <h2 className="text-xl font-semibold text-gray-800">
              Email Verified!
            </h2>
            <p className="text-sm text-gray-500 mt-2">
              Your account has been successfully activated.
            </p>

            <button
              onClick={() => router.push("/sign-in")}
              className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-medium transition"
            >
              Go to Login
            </button>
          </>
        )}

        {/* Error */}
        {status === "error" && (
          <>
            <div className="text-red-500 text-5xl mb-4">❌</div>
            <h2 className="text-xl font-semibold text-gray-800">
              Verification Failed
            </h2>
            <p className="text-sm text-gray-500 mt-2">
              The link is invalid or expired.
            </p>

            <button
              onClick={() => router.push("/sign-up")}
              className="mt-6 w-full bg-gray-800 hover:bg-gray-900 text-white py-2 rounded-lg font-medium transition"
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