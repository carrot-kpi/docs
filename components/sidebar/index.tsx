import { PageMapItem } from "nextra";
import Section from "./section";

interface SidebarProps {
    map: PageMapItem[];
}

const Sidebar = ({ map }: SidebarProps) => {
    return (
        <div className="w-1/3 flex flex-col items-end gap-3 py-6 px-6 border-r border-gray-300">
            <div className="w-2/3">
                <Section map={map} />
            </div>
        </div>
    );
};

export default Sidebar;
