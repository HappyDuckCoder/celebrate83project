"use client";

import { SignIn } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const SignInPage = () => {
  const [hasShownToast, setHasShownToast] = useState(false);

  useEffect(() => {
    if (!hasShownToast) {
      toast.error("Bạn phải đăng nhập!", {
        position: "top-right",
        duration: 3000,
      });
      setHasShownToast(true);
    }
  }, [hasShownToast]);

  return (
    <main className="auth-page">
      <div className="custom-signin-wrapper">
        <SignIn />
      </div>
    </main>
  );
};

export default SignInPage;
