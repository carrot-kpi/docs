import { PageMapItem, MdxFile, MetaJsonFile } from "nextra";

export interface ResolvedMdxFile extends MdxFile {
    resolvedName: string;
}

export const getFlattenedPageMap = (map: PageMapItem[]): ResolvedMdxFile[] => {
    const meta = map.find((child) => child.kind === "Meta") as
        | MetaJsonFile
        | undefined;

    // This should never happen
    if (!meta) return [];

    const sortedChildren: PageMapItem[] = [];
    for (const childMeta of Object.keys(meta.data)) {
        const foundChild = map.find((child) => {
            return (
                (child.kind === "Folder" || child.kind === "MdxPage") &&
                child.name === childMeta
            );
        });
        sortedChildren.push(foundChild);
    }

    const flattened: ResolvedMdxFile[] = [];
    for (const item of sortedChildren) {
        if (item.kind === "Folder")
            flattened.push(...getFlattenedPageMap(item.children));
        else if (item.kind === "MdxPage") {
            const titleFromMetadata = meta.data[item.name];
            flattened.push({
                ...item,
                resolvedName:
                    titleFromMetadata && typeof titleFromMetadata === "string"
                        ? titleFromMetadata
                        : item.name,
            });
        }
    }

    return flattened;
};
