import { SVGProps } from "react";

export const ChevronLeft = (props: SVGProps<SVGSVGElement>) => {
    return (
        <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="m12.603 5-5 5 5 5"
                stroke="currentColor"
                strokeLinecap="round"
            />
        </svg>
    );
};
