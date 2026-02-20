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
import { useTheme } from "next-themes";
import { signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const { status, data } = useSession();
  const src = data?.user?.image ?? "/default-user.png";

  /*===== STATE ===== */
  const { theme, setTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [openUserMenu, setOpenUserMenu] = useState(false);

  /*===== HANDLERS ===== */
  const changeTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const closeMenu = () => setIsMobileMenuOpen(false);

  /*===== RENDER ===== */
  const renderThemeIcon = () => {
    const Icon = theme === "light" ? MdOutlineDarkMode : IoSunnyOutline;
    return (
      <Icon
        onClick={changeTheme}
        className="cursor-pointer transition-transform hover:scale-110"
      />
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
      onClick={closeMenu}
    >
      {link.name}
    </Link>
  ));

  return (
    <nav className="fixed w-full z-50 bg-white shadow-lg dark:bg-surfaceDark dark:border-b dark:border-gray-800 transition-colors duration-300">
      {/* Overlay to prevent interaction when menu is open */}
      <div
        className={`fixed inset-0 bg-black/50 transition-opacity duration-300 lg:hidden ${isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={closeMenu}
      />

      <div className="container mx-auto flex items-center justify-between py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src={theme === "light" ? "/logo-black.svg" : "/logo-white.svg"}
            width={100}
            height={100}
            alt="logo"
            className="h-8 w-auto"
            priority
          />
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-8">
          {renderDesktopLinks}
        </div>

        {/* Mobile Menu Sidebar */}
        <aside
          className={`fixed right-0 top-0 h-full w-72 z-50 bg-white p-5 shadow-lg dark:bg-surfaceDark dark:text-white transform transition-transform duration-300 ease-in-out lg:hidden ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="flex items-center justify-between border-b pb-3">
            <h2 className="text-lg font-semibold capitalize">menu</h2>
            <MdOutlineCancel
              className="cursor-pointer text-2xl hover:text-red-500 transition-colors"
              onClick={closeMenu}
            />
          </div>

          <div className="mt-6 space-y-2">{renderMobileLinks}</div>

          {status !== "authenticated" && (
            <div className="mt-6 flex flex-col gap-2">
              <Link href={"/sign-in"} onClick={closeMenu}>
                <Button className="w-full capitalize border py-2 transition hover:bg-black hover:text-white">
                  sign in
                </Button>
              </Link>
              <Link href={"/sign-up"} onClick={closeMenu}>
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

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-4 text-xl">
            {renderThemeIcon()}
            <Link href={`/search?query=`}>
              <CiSearch className="cursor-pointer dark:text-white" />
            </Link>
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center gap-4 text-xl lg:hidden">
            {renderThemeIcon()}
            <Link href={`/search?query=`}>
              <CiSearch className="cursor-pointer dark:text-white" />
            </Link>

            <FaBarsStaggered
              className="cursor-pointer"
              onClick={() => setIsMobileMenuOpen(true)}
            />
          </div>

          {/* Auth Buttons */}
          {status === "authenticated" ? (
            <div
              className="relative "
              tabIndex={0}
              onBlur={(e) => {
                /*
            When the element loses focus, check where focus moved:
            If it moved outside the menu → close it
            If it moved to an element inside (like Logout button) → keep it open
            */
                const nextElementFocus = e.relatedTarget as Node | null;

                if (!e.currentTarget.contains(nextElementFocus)) {
                  setOpenUserMenu(false);
                }
              }}
            >
              {/* Avatar */}
              <Button
                onClick={() => setOpenUserMenu((prev) => !prev)}
                className="rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <Image
                  src={src}
                  alt={data?.user?.name || "user"}
                  width={40}
                  height={40}
                  className="rounded-full border-2 border-white"
                />
              </Button>

              {/* User Dropdown */}
              <div
                className={`absolute right-0 mt-3 w-52 rounded-xl border-gray bg-white shadow-lg transition-all duration-200 dark:bg-surfaceDark
                  ${
                    openUserMenu
                      ? "opacity-100 translate-y-0"
                      : "pointer-events-none opacity-0 -translate-y-2"
                  }`}
              >
                <div className="p-2">
                  {/* User info */}
                  <div className="px-3 py-2">
                    <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                      {data?.user?.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {data?.user?.email}
                    </p>
                  </div>

                  <div className="my-2 h-px bg-gray-200 dark:bg-gray-700" />

                  {/* Dashboard */}
                  <Link
                    href="/dashboard"
                    className="block rounded-lg px-3 py-2 text-sm transition hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    Dashboard
                  </Link>

                  {/* Logout */}
                  <Button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="mt-1 w-full text-left rounded-lg px-3 py-2 text-sm text-red-500 transition hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    Logout
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="hidden lg:flex items-center gap-2">
              <Link href={"/sign-in"}>
                <Button className="capitalize border px-6 py-1.5 transition hover:bg-black hover:text-white">
                  sign in
                </Button>
              </Link>
              <Link href={"/sign-up"}>
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
