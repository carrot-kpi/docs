import React from "react";
import Logotype from "./logotype";

export const Footer = () => (
    <div className="w-full py-16 bg-black md:py-24 lg:py-32">
        <div className="relative h-full mx-auto w-full md:w-[96%] bg-grid-dark">
            <div className="mx-auto py-14 md:py-24 xl:py-32 w-[90%]">
                <Logotype className="relative w-full h-auto text-orange" />
            </div>
        </div>
    </div>
);
