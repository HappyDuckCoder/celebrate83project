"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";

const Home = () => {
  const [message, setMessage] = React.useState<string>("");
  const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    console.log(message);
  };

  return (
    <main>
      <div>
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="input w-[200px] bg-slate-950 text-slate-50"
        />
        <Button
          type="submit"
          className="bg-slate-950 text-slate-50"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </div>
    </main>
  );
};

export default Home;
