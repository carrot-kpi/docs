import { PageMapItem } from "nextra";
import Section from "./section";
import { cva } from "class-variance-authority";

interface SidebarProps {
    map: PageMapItem[];
    onPageEntryClick?: () => void;
    className?: {
        root?: string;
        content?: string;
    };
}

const rootStyles = cva([
    "h-full",
    "w-full",
    "md:w-1/3",
    "flex",
    "flex-col",
    "md:items-end",
    "overflow-y-auto",
    "gap-3",
    "py-6",
    "px-6",
    "border-r",
    "border-gray-500",
]);

const contentStyles = cva(["w-2/3"]);

const Sidebar = ({ map, onPageEntryClick, className }: SidebarProps) => {
    return (
        <div className={rootStyles({ className: className?.root })}>
            <div className={contentStyles({ className: className?.content })}>
                <Section map={map} onPageEntryClick={onPageEntryClick} />
            </div>
        </div>
    );
};

export default Sidebar;
