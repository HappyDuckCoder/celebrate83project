"use client";

import React from "react";
import { SignInButton, SignOutButton, useAuth } from "@clerk/nextjs";
import { LogIn, LogOut } from "lucide-react";

const LoginButton = () => {
  const { isSignedIn } = useAuth();

  return (
    <div className="flex justify-center items-center">
      {isSignedIn ? (
        <SignOutButton>
          <div className="group relative">
            <button className="p-2 bg-red-600 text-white rounded-full shadow-md hover:bg-red-700 transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500">
              <LogOut size={24} />
            </button>
            <span className="absolute left-1/2 -translate-x-1/2 top-[-40px] z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm bg-white px-3 py-1 min-w-[100px] text-center rounded-xl shadow-md border border-gray-200 pointer-events-none">
              Đăng xuất
            </span>
          </div>
        </SignOutButton>
      ) : (
        <SignInButton>
          <div className="group relative">
            <button className="p-2 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700 transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <LogIn size={24} />
            </button>
            <span className="absolute left-1/2 -translate-x-1/2 top-[-40px] z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm bg-white px-3 py-1 min-w-[100px] text-center rounded-xl shadow-md border border-gray-200 pointer-events-none">
              Đăng nhập
            </span>
          </div>
        </SignInButton>
      )}
    </div>
  );
};

export default LoginButton;
