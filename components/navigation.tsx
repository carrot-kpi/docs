import { Typography } from "@carrot-kpi/ui";
import Link from "next/link";
import { useRouter } from "next/router";
import { PageMapItem } from "nextra";
import { getFlattenedPageMap, ResolvedMdxFile } from "utils/map";
import { ChevronLeft } from "./icons/chevron-left";
import { ChevronRight } from "./icons/chevron-right";

interface PreviousNextLinkProps {
    type: "previous" | "next";
    name: string;
    route: string;
}

const PreviousNextLink = ({ type, name, route }: PreviousNextLinkProps) => {
    return (
        <Link href={route} className="flex items-center gap-2">
            {type === "previous" && <ChevronLeft className="text-black w-6" />}
            <Typography variant="xl">{name}</Typography>
            {type === "next" && <ChevronRight className="text-black w-6" />}
        </Link>
    );
};

interface NavigationProps {
    map: PageMapItem[];
}

export const Navigation = ({ map }: NavigationProps) => {
    const router = useRouter();

    const flattenedPageMap = getFlattenedPageMap(map);

    let nextItem: ResolvedMdxFile | null = null;
    let previousItem: ResolvedMdxFile | null = null;
    for (let i = 0; i < flattenedPageMap.length; i++) {
        const item = flattenedPageMap[i];
        if (item.route === router.pathname) {
            const previosuItemIndex = i - 1;
            if (previosuItemIndex >= 0)
                previousItem = flattenedPageMap[previosuItemIndex];

            const nextItemIndex = i + 1;
            if (nextItemIndex < flattenedPageMap.length)
                nextItem = flattenedPageMap[nextItemIndex];
            break;
        }
    }

    return (
        <div className="flex flex-col gap-10 justify-between">
            {(previousItem || nextItem) && (
                <div className="w-full border-t border-gray-400" />
            )}
            <div className="flex justify-between">
                {previousItem ? (
                    <PreviousNextLink
                        type="previous"
                        name={previousItem.resolvedName}
                        route={previousItem.route}
                    />
                ) : (
                    <div />
                )}
                {nextItem ? (
                    <PreviousNextLink
                        type="next"
                        name={nextItem.resolvedName}
                        route={nextItem.route}
                    />
                ) : (
                    <div />
                )}
            </div>
        </div>
    );
};
