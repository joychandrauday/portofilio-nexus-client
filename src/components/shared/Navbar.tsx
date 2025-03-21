"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { IoMdSearch } from "react-icons/io";
import { FiSidebar } from "react-icons/fi";
import { TbLayoutBottombar, TbLayoutSidebarRight } from "react-icons/tb";
import { MdOutlineViewSidebar } from "react-icons/md";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";
import { useTheme } from "next-themes";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ShinyButton } from "../magicui/shiny-button";
import { signOut, useSession } from "next-auth/react";

export interface Session {
  data: {
    user: {
      name: string;
      email: string;
      image: string;
    };
  }
}

const Navbar: React.FC = () => {
  const session = useSession() as unknown as Session;
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const [scrolling, setScrolling] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const tabList = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Skill", path: "/skill" },
    { name: "Resume", path: "/resume" },
    { name: "Contact", path: "/contact" },
    { name: "Blog", path: "/blog" },
    { name: "SignIn", path: "/signin" },
  ];

  const currentIndex = tabList.findIndex((tab) => tab.path === pathname);
  const prevIndex = (currentIndex - 1 + tabList.length) % tabList.length;
  const nextIndex = (currentIndex + 1) % tabList.length;

  return (
    <div
      className={`sticky top-0 w-full md:justify-around z-50 flex justify-between border-b px-8 py-3 border-gray-500 transition-all duration-300 ${scrolling ? "backdrop-blur-md bg-opacity-75 sticky top-0" : "bg-transparent"
        }`}
    >
      {/* Navbar Start */}
      <div className="navbar-start hidden md:flex items-center gap-4 w-1/3">
        <Link href="/">
          <Image src="https://i.ibb.co/K0NmH2J/favicon.png" width={30} height={30} alt="Logo" priority className="" />
        </Link>

        {/* Navigation Arrows */}
        <div className="hidden lg:flex gap-3 text-2xl">
          <Link href={tabList[prevIndex].path}>
            <FaLongArrowAltLeft />
          </Link>
          <Link href={tabList[nextIndex].path}>
            <FaLongArrowAltRight />
          </Link>
        </div>
      </div>

      {/* Navbar Center */}
      <div className="flex items-center justify-center md:px-4 md:w-1/3">
        <Link
          href="/"
          className="flex items-center justify-center gap-2 font-bold border px-1 md:px-4 border-gray-600 rounded-md backdrop-blur-3xl bg-gray-800 bg-opacity-40 text-white mx-auto"
        >
          <IoMdSearch className="hidden md:block" />
          Joy Chandra Uday
          <span className="animate-pulse font-bold text-xl text-yellow-400 hidden md:block">_</span>
        </Link>
      </div>

      {/* Navbar End */}
      <div className="navbar-end flex items-center justify-end gap-4 md:w-1/3">
        {/* Theme Toggle */}
        <ShinyButton onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="text-lg">
          {theme === "dark" ? "☀️" : "🌙"}
        </ShinyButton>

        {/* Sidebar Buttons (Hidden on mobile, visible on large screens) */}
        <div className="hidden lg:flex gap-2 text-2xl">
          <FiSidebar />
          <TbLayoutBottombar />
          <TbLayoutSidebarRight />
          <MdOutlineViewSidebar />
        </div>

        {/* Mobile Hamburger Menu */}
        <button
          className="lg:hidden text-2xl"
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          <FiSidebar />
        </button>

        {/* User Dropdown */}
        {session?.data ? (
          <DropdownMenu>
            <DropdownMenuTrigger className="btn btn-ghost btn-circle avatar">
              <Image
                src={session.data.user.image || "https://i.ibb.co/K0NmH2J/favicon.png"}
                width={40}
                height={40}
                alt="User Avatar"
                className="rounded-full"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-44">
              <DropdownMenuItem className="font-bold">
                Welcome,<br /> <h1 className="">{session.data.user?.name ?? "Unknown"}</h1>
              </DropdownMenuItem>
              <DropdownMenuItem className="font-bold">
                <a href="/dashboard"> Dashboard </a>
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => signOut()} className="cursor-pointer">
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link href="/login" className="btn btn-outline">
            Sign In
          </Link>
        )}
      </div>

      {/* Mobile Menu (Hidden by default, shown when hamburger icon is clicked) */}
      {isMenuOpen && (
        <div className="lg:hidden fixed top-5 left-0 w-full h-full bg-black/50 z-50 flex justify-center items-start transition-all transition-300">
          <div className="bg-white p-6 rounded-lg text-black w-4/5">
            <ul className="space-y-4">
              {tabList.map((tab) => (
                <li key={tab.name}>
                  <Link href={tab.path} className="text-xl font-semibold">{tab.name}</Link>
                </li>
              ))}
            </ul>
            <button
              className="mt-4 text-lg text-white bg-black w-full py-2 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Close Menu
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
