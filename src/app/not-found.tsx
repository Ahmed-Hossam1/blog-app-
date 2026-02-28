import Link from "next/link";
import { HiOutlineExclamationTriangle } from "react-icons/hi2";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="text-center max-w-md">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-red-100 text-red-600 p-5 rounded-full">
            <HiOutlineExclamationTriangle size={50} />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-gray-800 mb-3">
          404 - Page Not Found
        </h1>

        {/* Description */}
        <p className="text-gray-500 mb-8">
          Sorry, the page you are looking for doesn’t exist or may have been
          moved.
        </p>

        {/* Buttons */}
        <div className="flex justify-center gap-4">
          <Link
            href="/"
            className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
