"use client";

import Cloud from "@/components/Cloud";
import { Lobster, Poppins } from "next/font/google";
import { useRouter } from "next/navigation";
import { List, SpeakerHigh, SpeakerSlash } from "phosphor-react";
import { useEffect, useState } from "react";

const lobster = Lobster({ weight: "400", subsets: ["latin"] });
const poppins = Poppins({ weight: ["400", "500", "700"], subsets: ["latin"] });

const Home = () => {
    const [toggled, setToggled] = useState(true);
    // const [soundOn, setSoundOn] = useState(null);
    // const [soundOff, setSoundOff] = useState(null);

    useEffect(() => {
        // setSoundOn(new Audio("/sounds/soundOn.mp3"));
        // setSoundOff(new Audio("/sounds/soundOff.mp3"));
    }, []);

    // const toggleSound = () => {
    //     setToggled(!toggled);

    //     if (toggled && soundOff) {
    //         soundOff.play();
    //     } else if (!toggled && soundOn) {
    //         soundOn.play();
    //     }
    // };

    const router = useRouter();

    const handleClick = () => {
        setToggled(!toggled);
        // toggleSound();
    };

    const handleGetRooms = () => {
        router.push("/classes");
    };

    return (
        <main className="flex h-screen">
            <div className="fixed top-0 left-0 right-0 z-[700] pt-[var(--padding-top,_env(safe-area-inset-top,_0px))] pl-[var(--padding-side,_env(safe-area-inset-left,_0px))] pr-[var(--padding-side,_env(safe-area-inset-right,_0px))] pointer-events-auto">
                <header className="flex flex-row items-center justify-between pointer-events-auto border-t-[20px] border-t-transparent px-[5%] h-[60px]">
                    <div className="flex">
                        <div className="h-12 w-12 mr-3">
                            <div className="flex items-center justify-center w-full h-full rounded-full bg-[#ff3333] cursor-pointer shadow-custom">
                                <List size={24} color="white" />
                            </div>
                        </div>
                        <div className="h-12 w-12 mr-3">
                            <div
                                className="flex items-center justify-center w-full h-full rounded-full cursor-pointer"
                                style={{
                                    backgroundColor: toggled
                                        ? "#ff3333"
                                        : "#AD00AD",
                                    boxShadow: toggled
                                        ? "3px 5px 0 rgba(0, 0, 0, .3), 3px 5px 0 var(--color-bar, #ff3333), 8px 7px 0 2px rgba(0, 0, 0, .24)"
                                        : "3px 5px 0 rgba(0, 0, 0, .3), 3px 5px 0 var(--color-bar, rgb(173, 0, 173)), 8px 7px 0 2px rgba(0, 0, 0, .24)",
                                }}
                                onClick={handleClick}
                            >
                                {toggled ? (
                                    <SpeakerHigh size={24} color="white" />
                                ) : (
                                    <SpeakerSlash size={24} color="white" />
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="h-5 w-5 bg-red-600"></div>
                </header>
            </div>
            <div className="text-center flex flex-col items-center relative box-border z-0 w-full pt-8 mt-20">
                <h1
                    className={`${lobster.className} font-normal text-5xl text-white my-3 mx-1 drop-shadow-custom transform rotate--3 skew--4`}
                >
                    Happy Women&apos;s Day
                </h1>
                <p
                    className={`${poppins.className} font-medium text-xl drop-shadow-custom2 text-white`}
                >
                    Chung tay tạo lời chúc cùng những bông hoa nhân dịp 8/3
                </p>
                <div className="mt-20 flex gap-14 justify-center items-center">
                    <Cloud
                        text="Tạo vườn hoa"
                        imglink={"/png/cloudright.png"}
                        onClickFunction={() => {}}
                        isCreateRoom={true}
                    />
                    <Cloud
                        text="Xem các vườn hoa"
                        imglink={"/png/cloudleft.png"}
                        onClickFunction={handleGetRooms}
                        isCreateRoom={false}
                    />
                </div>
            </div>
        </main>
    );
};

export default Home;
