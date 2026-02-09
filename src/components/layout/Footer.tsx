import Link from "next/link";
import { FaFacebookF, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-surfaceDark dark:border-t dark:border-gray-800 transition-colors duration-300">

      <div className="container mx-auto px-4">
        {/* Top Row */}
        <div className="flex flex-col items-center justify-between gap-6 border-b py-6 text-sm text-gray-600 dark:text-gray-400 dark:border-gray-800 md:flex-row">

          <p className="text-center md:text-left">
            © Blog-App - All Rights Reserved, Created by
            <Link
              href={"https://my-portfolio-mu-three-82.vercel.app/"}
              className="font-medium mx-1 text-baseInk dark:text-white hover:text-blue-800 dark:hover:text-blue-400"
            >
              AhmedHossam.com
            </Link>

          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            <Link
              href="#"
              className="rounded-full bg-baseInk p-2 text-white transition hover:opacity-80 dark:bg-gray-700 dark:hover:bg-gray-600"
            >
              <FaFacebookF size={14} />

            </Link>
            <Link
              href="#"
              className="rounded-full bg-baseInk p-2 text-white transition hover:opacity-80 dark:bg-gray-700 dark:hover:bg-gray-600"
            >
              <FaLinkedinIn size={14} />

            </Link>
            <Link
              href="#"
              className="rounded-full bg-baseInk p-2 text-white transition hover:opacity-80 dark:bg-gray-700 dark:hover:bg-gray-600"
            >
              <FaXTwitter size={14} />

            </Link>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="py-6 text-center text-sm text-gray-500 dark:text-gray-400">

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="#" className="hover:text-gray-800 dark:hover:text-gray-200">
              Terms & Conditions
            </Link>

            <span className="text-gray-300">•</span>
            <Link href="#" className="hover:text-gray-800 dark:hover:text-gray-200">
              Privacy Policy
            </Link>

            <span className="text-gray-300">•</span>
            <Link href="#" className="hover:text-gray-800 dark:hover:text-gray-200">
              Contact
            </Link>

          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
