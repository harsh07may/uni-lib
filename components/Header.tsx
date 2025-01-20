"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Session } from "next-auth";

import { cn, getInitials } from "@/lib/utils";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const Header = ({ session }: { session: Session }) => {
  const pathName = usePathname();
  return (
    <header className="my-10 flex justify-between gap-5">
      <Link href="/">
        <Image src="/icons/logo.svg" alt="logo" width={40} height={40} />
      </Link>
      <ul className="flex flex-row items-center gap-8 ">
        <li>
          <Link
            className={cn(
              "text-base cursor-pointer capitalize",
              pathName == "/library" ? "text-light-200" : "text-light-100",
            )}
            href="/library"
          >
            Library
          </Link>
        </li>
      </ul>
      <li>
        <Link href="/my-profile">
          <Avatar>
            <AvatarFallback className="text-white bg-cyan-900 border-2 border-white ">
              {getInitials(session?.user?.name || "IN")}
            </AvatarFallback>
          </Avatar>
        </Link>
      </li>
    </header>
  );
};
export default Header;
