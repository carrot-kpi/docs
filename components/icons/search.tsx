import { SVGProps } from "react";

const SearchIcon = (props: SVGProps<SVGSVGElement>) => {
    return (
        <svg
            width="24"
            height="25"
            viewBox="0 0 24 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M14.4121 15.0632L20 20.6511"
                stroke="currentColor"
                strokeLinecap="round"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10 16.6511C13.3137 16.6511 16 13.9648 16 10.6511C16 7.33741 13.3137 4.65112 10 4.65112C6.68629 4.65112 4 7.33741 4 10.6511C4 13.9648 6.68629 16.6511 10 16.6511Z"
                stroke="currentColor"
            />
        </svg>
    );
};

export default SearchIcon;
