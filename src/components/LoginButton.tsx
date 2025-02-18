import React from "react";
import { SignInButton, SignOutButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";

const LoginButton = async () => {
  const clerkUser = await currentUser();

  if (clerkUser) {
    return (
      <div className="flex justify-center items-center w-full">
        <SignOutButton>
          <button className="w-full py-3 px-6 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500">
            Đăng xuất
          </button>
        </SignOutButton>
      </div>
    );
  } else {
    return (
      <div className="flex justify-center items-center w-full">
        <SignInButton>
          <button className="w-full py-3 px-6 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Đăng nhập nè
          </button>
        </SignInButton>
      </div>
    );
  }
};

export default LoginButton;
