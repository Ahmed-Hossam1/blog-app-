"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const ConfirmEmailChangePage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();  // xyz?token=2139lksajld12312&name=John&email=1k6xY@example.com
  const token = searchParams.get("token");

  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading",
  );
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const res = await fetch("/api/user/verify-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data.message);

        setStatus("success");
        setTimeout(() => {
          router.push("/dashboard/settings");
        }, 1200);
      } catch (error) {
        console.error(error);
        setStatus("error");
      }
    };

    if (token) {
      verifyEmail();
    } else {
      setStatus("error");
      setMessage("Missing token in URL");
    }
  }, [token, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full text-center">
        {/* Loading */}
        {status === "loading" && (
          <>
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mx-auto mb-6"></div>
            <h2 className="text-xl font-semibold">Verifying your email...</h2>
          </>
        )}

        {/* Success */}
        {status === "success" && (
          <>
            <div className="text-green-500 text-5xl mb-4">✅</div>
            <h2 className="text-xl font-semibold">Email Verified!</h2>
            <p className="text-gray-600 mt-2">{message}</p>
          </>
        )}

        {/* Error */}
        {status === "error" && (
          <>
            <div className="text-red-500 text-5xl mb-4">❌</div>
            <h2 className="text-xl font-semibold">Verification Failed</h2>
            <p className="text-gray-600 mt-2">{message}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default ConfirmEmailChangePage;
