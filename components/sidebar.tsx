import { Typography } from "@carrot-kpi/ui";
import Link from "next/link";
import { useRouter } from "next/router";
import { MetaJsonFile, PageMapItem } from "nextra";
import { cva } from "class-variance-authority";

const sectionItemStyles = cva(["w-full p-2 rounded-xl transition"], {
    variants: {
        active: {
            true: ["bg-orange", "bg-opacity-20", "text-orange"],
            false: ["hover:bg-orange", "hover:bg-opacity-10"],
        },
    },
});

interface SectionProps {
    map: PageMapItem[];
    title?: string;
}

const Section = ({ map, title }: SectionProps) => {
    const router = useRouter();

    const meta = map.find((item) => item.kind === "Meta") as
        | MetaJsonFile
        | null
        | undefined;

    // This should never happen
    if (!meta) return null;

    return (
        <div className="w-full mb-4 flex flex-col">
            {title && (
                <Typography
                    weight="medium"
                    className={{ root: "w-full pl-2 mt-4 mb-3 text-gray-400" }}
                    uppercase
                >
                    {title}
                </Typography>
            )}
            {map.map((item) => {
                if (item.kind === "Folder") {
                    const sectionTitleFromMeta = meta.data[item.name];
                    return (
                        <Section
                            key={item.route}
                            map={item.children}
                            title={
                                sectionTitleFromMeta &&
                                typeof sectionTitleFromMeta === "string"
                                    ? sectionTitleFromMeta
                                    : item.name
                            }
                        />
                    );
                } else if (item.kind === "MdxPage") {
                    const nameFromMeta = meta.data[item.name];
                    const active = router.pathname === item.route;
                    return (
                        <Link key={item.name} href={item.route}>
                            <Typography
                                weight={active ? "medium" : "normal"}
                                className={{
                                    root: sectionItemStyles({ active }),
                                }}
                            >
                                {nameFromMeta &&
                                typeof nameFromMeta === "string"
                                    ? nameFromMeta
                                    : item.name}
                            </Typography>
                        </Link>
                    );
                }
            })}
        </div>
    );
};

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
