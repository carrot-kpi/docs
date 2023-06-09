import React, { SVGProps } from "react";

const Menu = (props: SVGProps<SVGSVGElement>) => {
    return (
        <svg
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                fill="#000"
                d="M4.5 7.143h27v2h-27zM4.5 26.857h27v2h-27zM4.5 17h27v2h-27z"
            />
        </svg>
    );
};

export default Menu;
