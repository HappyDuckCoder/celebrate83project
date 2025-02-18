import type { Metadata } from "next";
import "./globals.css";
import Provider from "./Provider";
import { ClerkProvider } from "@clerk/nextjs";
import LoginButton from "@/components/LoginButton";

export const metadata: Metadata = {
  title: "Happy Women Day",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link rel="icon" href="/avif/header.avif" />
        </head>
        <body>
          <div className="absolute top-0 right-0 p-4">
            <LoginButton />
          </div>

          <div
            className="h-screen bg-center bg-cover bg-fixed"
            style={{
              backgroundImage: "url('/png/bg.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="h-full w-full flex items-center justify-center">
              <Provider>{children}</Provider>
            </div>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
