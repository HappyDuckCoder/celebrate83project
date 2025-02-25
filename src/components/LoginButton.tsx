import { LogIn } from "lucide-react";

interface LoginButtonProps {
    onClick: () => void;
}

export default function LoginButton({ onClick }: LoginButtonProps) {
    return (
        <button
            onClick={onClick}
            className="fixed top-4 right-16 z-50 p-3 rounded-full transition-all shadow-lg bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white flex items-center justify-center w-12 h-12 mr-3"
        >
            <LogIn size={28} />
        </button>
    );
}
