"use client";

import { useBackground } from "../app/useContext/bgContext";

export default function BackgroundWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    const { backgroundImage } = useBackground();

    return (
        <div
            className="min-h-screen w-full bg-cover bg-center flex items-center justify-center"
            style={{ backgroundImage: `url('${backgroundImage}')` }}
        >
            <div className="w-full flex items-center justify-center px-4 py-6">
                {children}
            </div>
        </div>
    );
}
