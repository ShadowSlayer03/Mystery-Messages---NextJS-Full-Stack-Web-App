"use client";

import React from "react";
import { User } from "next-auth";
import { signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";
import ShinyButton from "./magicui/shiny-button";

const Navbar = () => {
  const { data: session, status } = useSession();
  const user: User = session?.user as User;

  return (
    <nav className="p-2 md:p-6 shadow-md bg-[#0d0d0d] text-white relative z-[50]">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <Link
          href="/"
          className="flex gap-2 items-center text-xl font-bold mb-4 md:mb-0"
        >
          <Image
            width={70}
            height={70}
            src="/mystery_messages_logo.png"
            alt="Mystery Messages Logo"
          />
          <h2>Mystery Messages</h2>
        </Link>
        {session ? (
          <>
            <span className="mr-4">
              Welcome, {user?.username || user?.email}
            </span>
            <ShinyButton text="Logout" className="w-full md:w-auto" onClick={() => signOut()} />
          </>
        ) : (
          <div className="flex gap-5">
            <Link href="/sign-up">
              <ShinyButton text="Sign Up" className="text-white" />
            </Link>
            <Link href="/sign-in">
              <ShinyButton text="Login" className="text-white" />
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
