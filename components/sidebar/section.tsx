import { Typography } from "@carrot-kpi/ui";
import { useRouter } from "next/router";
import { MetaJsonFile, PageMapItem } from "nextra";
import PageLink from "./page-link";

interface SectionProps {
    map: PageMapItem[];
    title?: string;
}

const Section = ({ map, title }: SectionProps) => {
    const router = useRouter();

    const meta = map[0].kind === "Meta" ? map[0] : undefined;

    // This should never happen
    if (!meta) return null;

    return (
        <div className="w-full mb-4 flex flex-col gap-0.5">
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
                            <Section key={item.route} map={sortedChildren} />
                        </>
                    );
                } else if (item.kind === "MdxPage") {
                    const nameFromMeta = meta.data[item.name];
                    return (
                        <PageLink
                            key={item.route}
                            active={router.pathname === item.route}
                            name={
                                nameFromMeta && typeof nameFromMeta === "string"
                                    ? nameFromMeta
                                    : item.name
                            }
                            route={item.route}
                        />
                    );
                }
            })}
        </div>
    );
};

export default Section;
