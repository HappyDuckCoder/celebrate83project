import type { Metadata } from "next";
import "./globals.css";
import Provider from "./Provider";
import { ClerkProvider } from "@clerk/nextjs";
import LoginButton from "@/components/LoginButton";

export const metadata: Metadata = {
  title: "Happy Women Day",
  description: "Chúc mừng ngày Phụ nữ Việt Nam!",
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
        <body className="relative h-screen w-screen">
          <div className="absolute top-4 right-4">
            <LoginButton />
          </div>

          <div
            className="h-screen w-screen bg-cover bg-center flex items-center justify-center"
            style={{ backgroundImage: "url('/png/bg.png')" }}
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
