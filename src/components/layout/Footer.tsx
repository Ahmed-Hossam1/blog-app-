import Link from "next/link";
import { FaFacebookF, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-white">
      <div className="container mx-auto px-4">
        {/* Top Row */}
        <div className="flex flex-col items-center justify-between gap-6 border-b py-6 text-sm text-gray-600 md:flex-row">
          <p className="text-center md:text-left">
            © Blog-App - All Rights Reserved, Created by
            <Link
              href={"https://my-portfolio-mu-three-82.vercel.app/"}
              className="font-medium mx-1 text-baseInk  hover:text-blue-800"
            >
              AhmedHossam.com
            </Link>
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            <Link
              href="#"
              className="rounded-full bg-baseInk p-2 text-white transition hover:opacity-80"
            >
              <FaFacebookF size={14} />
            </Link>
            <Link
              href="#"
              className="rounded-full bg-baseInk p-2 text-white transition hover:opacity-80"
            >
              <FaLinkedinIn size={14} />
            </Link>
            <Link
              href="#"
              className="rounded-full bg-baseInk p-2 text-white transition hover:opacity-80"
            >
              <FaXTwitter size={14} />
            </Link>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="py-6 text-center text-sm text-gray-500">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="#" className="hover:text-gray-800">
              Terms & Conditions
            </Link>
            <span className="text-gray-300">•</span>
            <Link href="#" className="hover:text-gray-800">
              Privacy Policy
            </Link>
            <span className="text-gray-300">•</span>
            <Link href="#" className="hover:text-gray-800">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
