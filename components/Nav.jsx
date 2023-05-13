"use client";
import { Button, Tooltip } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

import { usePathname } from "next/navigation";
const Nav = () => {
  // const [isUserLoggedIn, setisUserLoggedIn] = useState(false);
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  const [isMenuOpen, setisMenuOpen] = useState(false);
  const path = usePathname();
  useEffect(() => {
    const setUpProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };
    setUpProviders();
  }, []);
  return (
    <>
      <nav className="flex justify-between w-full mb-16 pt-3">
        <Link href="/" className="flex gap-2 justify-center pl-4 space-x-4">
          <Image
            src="https://images.unsplash.com/photo-1496200186974-4293800e2c20?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fFAlMjBsb2dvfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
            width={60}
            height={60}
            alt="Prompt Logo"
            className="object-contain"
          />
          <p className="md:flex flex-col justify-center font-semibold hidden">
            AI-Prompts
          </p>
        </Link>

        {/* Desktop Navigation */}
        <div className="sm:flex hidden">
          {session?.user ? (
            <>
              <div className="flex gap-3 md:gap-5">
                <Link
                  className="rounded-full border border-black py-2 px-5 text-black hover:bg-black hover:text-white text-sm flex flex-col justify-center transition-all"
                  href="/create_prompts"
                >
                  Create Prompt
                </Link>
                <Link
                  className="rounded-full border border-black py-2 px-5 text-black hover:bg-black hover:text-white text-sm flex flex-col justify-center transition-all"
                  href="/open_feed"
                >
                  Open Feed
                </Link>
                <button
                  className="rounded-full border border-black bg-black py-2 px-5 text-white hover:bg-transparent hover:text-black text-sm transition-all"
                  onClick={signOut}
                >
                  Sign Out
                </button>
                <Tooltip title="Our Own AI-Powered ChatBot" placement="top">
                  <Link
                    className={`rounded-full py-2 px-5 text-black ${
                      path !== "/chat_it_out"
                        ? "hover:bg-black hover:text-white border border-black"
                        : "bg-blue-500 hover:bg-blue-200"
                    } text-sm flex flex-col justify-center transition-all`}
                    href="/chat_it_out"
                  >
                    Open Chat-IT-OUT
                  </Link>
                </Tooltip>

                <Link href="/profile" className="pr-4">
                  <Image
                    src={session?.user?.image}
                    width={30}
                    height={30}
                    // onClick={() => setisMenuOpen((prev) => !prev)}
                  />
                </Link>
                {/* <Link href="/create_prompts">
                  <button className="rounded-full border border-black bg-black py-2 px-5 text-white hover:bg-white hover:text-black text-sm transition-all">
                    Profile
                  </button>
                </Link> */}
              </div>
            </>
          ) : (
            <>
              <div className="space-x-4 flex">
                {/* <Link
                  className="rounded-full border border-black py-2 px-5 text-black hover:bg-black hover:text-white text-sm flex flex-col justify-center transition-all"
                  href="/open_feed"
                >
                  Open Feed
                </Link> */}
                <Tooltip title="Our Own AI-Powered ChatBot" placement="top">
                  <Link
                    className={`rounded-full py-2 px-5 text-black ${
                      path !== "/chat_it_out"
                        ? "hover:bg-black hover:text-white border border-black"
                        : "bg-blue-500 hover:bg-blue-200"
                    } text-sm flex flex-col justify-center transition-all`}
                    href="/chat_it_out"
                  >
                    Open Chat-IT-OUT
                  </Link>
                </Tooltip>
                {providers &&
                  Object.values(providers).map((provider) => (
                    <button
                      type="button"
                      key={provider.name}
                      onClick={() => {
                        signIn(provider.id);
                      }}
                      className="rounded-full border border-black bg-black py-2 px-5 text-white hover:bg-transparent hover:text-black text-sm transition-all"
                    >
                      Sign in
                    </button>
                  ))}
              </div>
            </>
          )}
        </div>

        {/* Mobile Navigation */}
        <div className="sm:hidden flex relative">
          {session?.user ? (
            <>
              <div className="flex rounded-full pr-2">
                {/* <AccountBoxIcon
                  color="blue"
                  fontSize="large"
                  onClick={() => setisMenuOpen((prev) => !prev)}
                /> */}
                <Image
                  src={session?.user?.image}
                  width={30}
                  height={30}
                  onClick={() => setisMenuOpen((prev) => !prev)}
                />
              </div>
              {isMenuOpen && (
                <div className="absolute right-0 top-full mt-3 w-full p-5 rounded-lg bg-white min-w-[210px] flex flex-col gap-2 justify-end items-end">
                  <Link
                    href="/profile"
                    onClick={() => {
                      setisMenuOpen(false);
                    }}
                    className="text-sm font-inter text-gray-700 hover:text-gray-500 font-medium"
                  >
                    My Profile
                  </Link>
                  <Link
                    href="/create_prompts"
                    onClick={() => {
                      setisMenuOpen(false);
                    }}
                    className="text-sm font-inter text-gray-700 hover:text-gray-500 font-medium"
                  >
                    Create Prompts
                  </Link>
                  <Link
                    href="/chat_it_out"
                    onClick={() => {
                      setisMenuOpen(false);
                    }}
                    className="text-sm font-inter text-gray-700 hover:text-gray-500 font-medium"
                  >
                    Open Chat-It-Out
                  </Link>
                  <button
                    className="rounded-full border border-black bg-black py-2 px-5 text-white hover:bg-white hover:text-black text-sm transition-all w-full mt-5"
                    onClick={() => {
                      setisMenuOpen(false);
                      signOut();
                    }}
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </>
          ) : (
            <>
              <>
                {providers &&
                  Object.values(providers).map((provider) => (
                    <button
                      type="button"
                      key={provider.name}
                      onClick={() => {
                        signIn(provider.id);
                      }}
                      className="rounded-full border border-black bg-black py-2 px-5 text-white hover:bg-transparent hover:text-black text-sm transition-all"
                    >
                      Sign in
                    </button>
                  ))}
              </>
            </>
          )}
        </div>
      </nav>
    </>
  );
};

export default Nav;
