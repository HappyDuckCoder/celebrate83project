import type { Metadata } from "next";
import "./globals.css";
import Provider from "./Provider";

export const metadata: Metadata = {
  title: "Happy Women Day",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/avif/header.avif" />
        <title>Happy Women Day</title>
      </head>
      <body>
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
  );
}
