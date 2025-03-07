import type { Metadata } from "next";
import "./globals.css";
import Provider from "./Provider";
import { ClerkProvider } from "@clerk/nextjs";
import { EdgeStoreProvider } from "@/lib/edgestore";

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
        <body className="relative min-h-screen w-full overflow-hidden">
          <div
            className="min-h-screen w-full bg-cover bg-center flex items-center justify-center"
            style={{ backgroundImage: "url('/png/bg.png')" }}
          >
            <div className="w-full flex items-center justify-center px-4 py-6">
              <EdgeStoreProvider>
                <Provider>{children}</Provider>
              </EdgeStoreProvider>
            </div>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
