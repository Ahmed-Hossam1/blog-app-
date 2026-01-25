import Image from "next/image";
import Link from "next/link";
import { IoSunnyOutline } from "react-icons/io5";
import { MdOutlineDarkMode } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import { FaBarsStaggered } from "react-icons/fa6";
import Button from "./Button";

const Navbar = () => {
  const links = ["blogs", "contact"];

  return (
    <nav className="py-4">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image src="/logo.svg" width={100} height={100} alt="logo" />
        </Link>

        {/* Desktop Links */}
        <ul className="hidden lg:flex items-center gap-6 capitalize">
          {links.map((link,index) => (
            <li
              key={index}
              className="cursor-pointer transition hover:text-blue-400"
            >
              {link}
            </li>
          ))}
        </ul>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle  */}
          <div className="hidden lg:flex items-center gap-3 text-xl">
            <MdOutlineDarkMode className="cursor-pointer" />
            <IoSunnyOutline className="cursor-pointer" />
          </div>

          {/* Search + Menu  */}
          <div className="flex items-center gap-4 text-xl lg:hidden">
            <CiSearch className="cursor-pointer" />
            <FaBarsStaggered className="cursor-pointer" />
          </div>

          {/* Auth Buttons  */}
          <div className="hidden lg:flex items-center gap-2">
            <Button className="capitalize border px-6 py-1.5 transition hover:bg-black hover:text-white">
              sign in
            </Button>
            <Button
              bgColor="bg-black"
              className="capitalize px-6 py-1.5 font-medium text-white"
            >
              sign up
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
