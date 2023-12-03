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
    const meta = map[0].kind === "Meta" ? map[0] : undefined;

    // This should never happen
    if (!meta) return null;

    const sortedMap: PageMapItem[] = [meta];
    for (const childMeta of Object.keys(meta.data)) {
        const foundChild = map.find((child) => {
            const found =
                (child.kind === "Folder" || child.kind === "MdxPage") &&
                child.name === childMeta;
            return found;
        });
        sortedMap.push(foundChild);
    }

    return (
        <div className={rootStyles({ className: className?.root })}>
            <div className={contentStyles({ className: className?.content })}>
                <Section map={sortedMap} onPageEntryClick={onPageEntryClick} />
            </div>
        </div>
    );
};

export default Sidebar;
