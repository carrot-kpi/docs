import { PageMapItem } from "nextra";
import X from "./icons/x";
import Sidebar from "./sidebar";
import { cva } from "class-variance-authority";
import { useEffect, useRef } from "react";

const rootStyles = cva(
    [
        "z-10",
        "h-full",
        "w-3/4",
        "fixed",
        "bg-white",
        "dark:bg-black",
        "-translate-x-full",
        "transition-all",
    ],
    {
        variants: {
            open: {
                true: ["translate-x-0"],
                false: ["-translate-x-full"],
            },
        },
    }
);

const backgroundStyles = cva(
    [
        "z-10",
        "transition-opacity",
        "fixed",
        "h-full",
        "w-full",
        "bg-black/30",
        "backdrop-blur",
    ],
    {
        variants: {
            open: {
                true: [],
                false: ["hidden"],
            },
        },
    }
);

interface SidenavProps {
    open: boolean;
    map: PageMapItem[];
    onDismiss: () => void;
}

const Sidenav = ({ open, map, onDismiss }: SidenavProps) => {
    const backgroundRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!open || !onDismiss) return;
        const handleCloseOnClick = (event: MouseEvent) => {
            if (
                !!backgroundRef.current &&
                backgroundRef.current.isSameNode(event.target as Node)
            )
                onDismiss();
        };
        document.addEventListener("mousedown", handleCloseOnClick);
        return () => {
            document.removeEventListener("mousedown", handleCloseOnClick);
        };
    }, [onDismiss, open]);

    return (
        <>
            <div ref={backgroundRef} className={backgroundStyles({ open })} />
            <div className={rootStyles({ open })}>
                <div className="px-4 py-6 items-center border-r border-b border-black dark:border-white bg-orange">
                    <X onClick={onDismiss} className="w-7 h-7 cursor-pointer" />
                </div>
                <Sidebar
                    map={map}
                    onPageEntryClick={onDismiss}
                    className={{ content: "w-full" }}
                />
            </div>
        </>
    );
};

export default Sidenav;
