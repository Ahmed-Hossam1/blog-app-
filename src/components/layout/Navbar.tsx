"use client";
import { navLinksData } from "@/data";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaBarsStaggered } from "react-icons/fa6";
import { IoSunnyOutline } from "react-icons/io5";
import { MdOutlineCancel, MdOutlineDarkMode } from "react-icons/md";
import Button from "../ui/Button";

import { useSession } from "next-auth/react";
import { useTheme } from "next-themes";

const Navbar = () => {
  const { status, data } = useSession();
  const src = data?.user?.image ?? "https://i.pravatar.cc/150?img=3";

  /*===== STATE ===== */
  const { theme, setTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  /*===== HANDLERS ===== */
  const changeTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  /*===== RENDER ===== */
  const renderThemeIcon = () => {
    return theme === "light" ? (
      <MdOutlineDarkMode onClick={changeTheme} className="cursor-pointer" />
    ) : (
      <IoSunnyOutline onClick={changeTheme} className="cursor-pointer" />
    );
  };

  const renderDesktopLinks = navLinksData.map((link) => (
    <Link
      key={link.id}
      className="cursor-pointer capitalize text-sm font-medium transition hover:text-blue-500 dark:text-gray-200 dark:hover:text-blue-400"
      href={link.to}
    >
      {link.name}
    </Link>
  ));

  const renderMobileLinks = navLinksData.map((link) => (
    <Link
      key={link.id}
      className="px-3 py-2 block text-base capitalize cursor-pointer rounded-md transition hover:bg-blue-100 hover:text-blue-600 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-blue-400"
      href={link.to}
    >
      {link.name}
    </Link>
  ));

  return (
    <nav className="fixed w-full z-50 bg-white shadow-lg dark:bg-surfaceDark dark:border-b dark:border-gray-800 transition-colors duration-300">
      <div className="container mx-auto flex items-center justify-between py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.svg"
            width={100}
            height={100}
            alt="logo"
            className="h-8 w-auto"
          />
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-8">
          {renderDesktopLinks}
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-40 bg-black/40 lg:hidden">
            <aside
              className={`absolute right-0 top-0 h-full w-72 bg-white p-5 shadow-lg dark:bg-surfaceDark dark:text-white transition-colors duration-300`}
            >
              <div className="flex items-center justify-between border-b pb-3">
                <h2 className="text-lg font-semibold capitalize">menu</h2>
                <MdOutlineCancel
                  className="cursor-pointer text-xl hover:text-red-700 hover:transition hover:duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                />
              </div>

              <div className="mt-6 space-y-2">{renderMobileLinks}</div>

              {status !== "authenticated" && (
                <div className="mt-6 flex flex-col gap-2">
                  <Link href={"/sign-in"}>
                    <Button className="w-full capitalize border py-2 transition hover:bg-black hover:text-white">
                      sign in
                    </Button>
                  </Link>
                  <Link href={"/sign-up"}>
                    <Button
                      bgColor="bg-black"
                      className="w-full capitalize py-2 font-medium text-white"
                    >
                      sign up
                    </Button>
                  </Link>
                </div>
              )}
            </aside>
          </div>
        )}

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-4 text-xl">
            {renderThemeIcon()}
            <CiSearch className="cursor-pointer dark:text-white" />
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center gap-4 text-xl lg:hidden">
            {renderThemeIcon()}
            <CiSearch className="cursor-pointer dark:text-white" />

            <FaBarsStaggered
              className="cursor-pointer"
              onClick={() => setIsMobileMenuOpen(true)}
            />
          </div>

          {/* Auth Buttons */}
          {status === "authenticated" ? (
            <Link href={`/profile/${data.user?.name}`}>
              <Image
                src={src}
                alt={`${data?.user?.name}`}
                width={40}
                height={40}
                className="rounded-full border-2 border-white cursor-pointer"
              />
            </Link>
          ) : (
            <div className="hidden lg:flex items-center gap-2">
              <Link href={"sign-in"}>
                <Button className="capitalize border px-6 py-1.5 transition hover:bg-black hover:text-white">
                  sign in
                </Button>
              </Link>
              <Link href={"sign-up"}>
                <Button
                  bgColor="bg-black"
                  className="capitalize px-6 py-1.5 font-medium text-white"
                >
                  sign up
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
