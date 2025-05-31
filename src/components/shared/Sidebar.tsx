
"use client";

import React from "react";
import Image from "next/image";
import sideBar from "../../../public/Screenshot 2024-07-03 024705.png";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoMdCopy, IoMdHome, IoMdPerson } from "react-icons/io";
import { FaInfo, FaUserCog } from "react-icons/fa";
import { MdMail } from "react-icons/md";
import { FcReading } from "react-icons/fc";
import { TbDashboard } from "react-icons/tb";
// Define sidebar links separately
const userLinks = [
  { href: "/", label: "Home", icon: <IoMdHome className="text-3xl hover:text-white" /> },
  { href: "/projects", label: "Projects", icon: <IoMdCopy className="text-3xl hover:text-white" /> },
  { href: "/blog", label: "Blog", icon: <FcReading className="text-3xl hover:text-white" /> },
  { href: "/contact", label: "Contact", icon: <MdMail className="text-3xl hover:text-white" /> },
  { href: "/about", label: "About Me", icon: <FaInfo className="text-3xl hover:text-white" /> },
  { href: "/resume", label: "Resume", icon: <IoMdPerson className="text-3xl hover:text-white" /> },
  { href: "/skill", label: "Skilled Stacks", icon: <FaUserCog className="text-3xl hover:text-white" /> },
];

const dashboardLinks = [
  { href: "/dashboard", label: "Dashboard", icon: <TbDashboard className="text-3xl text-red-500 hover:text-white" /> },

];

const SideBarHome: React.FC = () => {
  const pathname = usePathname(); // Get the current route
  const isDashboard = pathname.startsWith("/dashboard"); // Check if it's a dashboard route

  return (
    <div className="w-[80px] h-screen md:flex z-40 hidden sticky top-16 left-0">
      <ul className="menu space-y-3 p-4 border-r border-gray-500">
        {isDashboard
          ? // Show dashboard links if inside the dashboard
          dashboardLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} title={link.label}>
                {link.icon}
              </Link>
            </li>
          ))
          : // Show user links if outside the dashboard
          userLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="tooltip tooltip-right" data-tip={link.label}>
                {link.icon}
              </Link>
            </li>
          ))}
      </ul>
      <Image
        src={sideBar}
        width={80}
        height={300}
        alt="Sidebar Logo"
        className="invert dark:invert-0"
      />

    </div>
  );
};

export default SideBarHome;
