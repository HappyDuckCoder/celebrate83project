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
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute top-0 left-0 w-full h-full object-cover z-[-1]"
                >
                    <source src="/video/background.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>

                <div className="h-screen">
                    <div className="h-full w-full flex items-center justify-center">
                        <Provider>{children}</Provider>
                    </div>
                </div>
            </body>
        </html>
    );
}
