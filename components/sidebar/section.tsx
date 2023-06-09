import { Typography } from "@carrot-kpi/ui";
import { useRouter } from "next/router";
import { MetaJsonFile, PageMapItem } from "nextra";
import PageEntry from "./page-entry";

interface SectionProps {
    map: PageMapItem[];
    onPageEntryClick?: () => void;
    level?: number;
}

const Section = ({ map, level = 0, onPageEntryClick }: SectionProps) => {
    const router = useRouter();

    const meta = map[0].kind === "Meta" ? map[0] : undefined;

    // This should never happen
    if (!meta) return null;

    return (
        <div className="w-full mb-4 flex flex-col gap-0.5 mt-0.5">
            {map.map((item) => {
                if (item.kind === "Folder") {
                    const sectionTitleFromMeta = meta.data[item.name];

                    const childrenMeta = item.children.find(
                        (child) => child.kind === "Meta"
                    ) as MetaJsonFile | undefined;

                    // This should never happen
                    if (!childrenMeta) return null;

                    const sortedChildren: PageMapItem[] = [childrenMeta];
                    for (const childMeta of Object.keys(childrenMeta.data)) {
                        const foundChild = item.children.find((child) => {
                            return (
                                (child.kind === "Folder" ||
                                    child.kind === "MdxPage") &&
                                child.name === childMeta
                            );
                        });
                        sortedChildren.push(foundChild);
                    }

                    if (!level) {
                        return (
                            <>
                                <Typography
                                    weight="bold"
                                    className={{
                                        root: "w-full pl-3 mt-4 mb-2 tracking-wider",
                                    }}
                                    uppercase
                                >
                                    {sectionTitleFromMeta &&
                                    typeof sectionTitleFromMeta === "string"
                                        ? sectionTitleFromMeta
                                        : item.name}
                                </Typography>
                                <Section
                                    key={item.route}
                                    map={sortedChildren}
                                    onPageEntryClick={onPageEntryClick}
                                    level={level + 1}
                                />
                            </>
                        );
                    } else {
                        const nameFromMeta = meta.data[item.name];
                        const hasIndexPage = !!sortedChildren.find((child) => {
                            return (
                                child.kind === "MdxPage" &&
                                child.name === "index"
                            );
                        });

                        return (
                            <PageEntry
                                key={item.route}
                                active={router.pathname === item.route}
                                level={level}
                                name={
                                    nameFromMeta &&
                                    typeof nameFromMeta === "string"
                                        ? nameFromMeta
                                        : item.name
                                }
                                route={hasIndexPage ? item.route : undefined}
                                onClick={onPageEntryClick}
                                treeSectionProps={{
                                    map: sortedChildren.filter((child) => {
                                        return (
                                            child.kind !== "MdxPage" ||
                                            child.name !== "index"
                                        );
                                    }),
                                    onPageEntryClick,
                                    level: level + 1,
                                }}
                            />
                        );
                    }
                } else if (item.kind === "MdxPage") {
                    const nameFromMeta = meta.data[item.name];
                    return (
                        <PageEntry
                            key={item.route}
                            active={router.pathname === item.route}
                            level={level}
                            name={
                                nameFromMeta && typeof nameFromMeta === "string"
                                    ? nameFromMeta
                                    : item.name
                            }
                            route={item.route}
                            onClick={onPageEntryClick}
                        />
                    );
                }
            })}
        </div>
    );
};

export default Section;
