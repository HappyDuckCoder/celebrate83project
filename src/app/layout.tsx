import BackgroundWrapper from "@/components/BackgroundWrapper";
import { EdgeStoreProvider } from "@/lib/edgestore";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import { BackgroundProvider } from "../app/useContext/bgContext";
import "./globals.css";
import Provider from "./Provider";

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
          <BackgroundProvider>
            <EdgeStoreProvider>
              <Provider>
                <BackgroundWrapper>
                  <Toaster />
                  {children}
                </BackgroundWrapper>
              </Provider>
            </EdgeStoreProvider>
          </BackgroundProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
