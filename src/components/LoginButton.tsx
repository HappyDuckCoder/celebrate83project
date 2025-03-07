"use client";

import { SignInButton, SignOutButton, useAuth } from "@clerk/nextjs";
import { LogIn, LogOut } from "lucide-react";

const LoginButton = () => {
  const { isSignedIn } = useAuth();

  return (
    <div className="flex justify-center items-center">
      {isSignedIn ? (
        <SignOutButton>
          <div className="group relative">
            <button className="w-12 h-12 flex items-center justify-center bg-red-600 text-white rounded-full shadow-md hover:bg-red-700 transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500">
              <LogOut className="w-6 h-6" />
            </button>
            <span className="absolute left-1/2 -translate-x-1/2 top-[-30px] z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm bg-white px-3 py-1 min-w-[100px] text-center rounded-xl shadow-md border border-gray-200 pointer-events-none">
              Đăng xuất
            </span>
          </div>
        </SignOutButton>
      ) : (
        <SignInButton>
          <div className="group relative">
            <button className="w-12 h-12 flex items-center justify-center bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700 transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <LogIn className="w-6 h-6" />
            </button>
            <span className="absolute left-1/2 -translate-x-1/2 top-[-30px] z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm bg-white px-3 py-1 min-w-[100px] text-center rounded-xl shadow-md border border-gray-200 pointer-events-none">
              Đăng nhập
            </span>
          </div>
        </SignInButton>
      )}
    </div>
  );
};

export default LoginButton;
