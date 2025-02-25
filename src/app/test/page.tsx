import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

const Test = async () => {
  const clerkUser = await currentUser();
  if (!clerkUser) redirect("/sign-in");

  return <div>Test</div>;
};

export default Test;
