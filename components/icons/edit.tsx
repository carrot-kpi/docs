import { SVGProps } from "react";

const EditIcon = (props: SVGProps<SVGSVGElement>) => {
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
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15.5858 5.06534C16.3668 4.28429 17.6332 4.28429 18.4142 5.06534L19.5858 6.23691C20.3668 7.01796 20.3668 8.28429 19.5858 9.06534L8.58579 20.0653C8.21071 20.4404 7.70201 20.6511 7.17157 20.6511L4 20.6511L4 17.4796C4 16.9491 4.21071 16.4404 4.58579 16.0653L15.5858 5.06534Z"
                stroke="black"
            />
            <path d="M14 6.65112L18 10.6511" stroke="black" />
        </svg>
    );
};

export default EditIcon;
