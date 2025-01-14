"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

const Header = () => {
  const pathName = usePathname();
  return (
    <div className="my-10 flex justify-between gap-5">
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
      Header
    </div>
  );
};
export default Header;
