"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// SidebarItemProps.ts
export interface SidebarItemProps {
  url: string;
  icon: React.ReactNode;
  label: string;
}

const SidebarItem = ({ url, icon, label }: SidebarItemProps) => {
  const pathname = usePathname();

  return (
    <li
      className={`rounded-2xl h-16 duration-500 hover:bg-base-300 ${
        pathname === url ? "bg-warning" : "bg-transparent"
      }`}
    >
      <Link
        target="_self"
        href={url}
        className="flex items-center p-2 rounded-lg group mx-6 h-full my-auto"
      >
        {icon}
        <span
          className={`ms-8 text-lg ${
            pathname === url ? "text-white" : "text-base-content opacity-50"
          }`}
        >
          {label}
        </span>
      </Link>
    </li>
  );
};

export default SidebarItem;
