import { Typography } from "@carrot-kpi/ui";
import { cva } from "class-variance-authority";
import { ChevronRight } from "components/icons/chevron-right";
import Link from "next/link";
import { type ElementType, useCallback, useState } from "react";
import Section from "./section";
import { PageMapItem } from "nextra";

const LEFT_PADDING_STEP_PIXEL = 16;

const itemStyles = cva(
    [
        "cursor-pointer",
        "w-full",
        "flex",
        "justify-between",
        "gap-2",
        "px-3",
        "py-2",
        "rounded-xl",
        "transition",
    ],
    {
        variants: {
            active: {
                true: ["bg-orange", "bg-opacity-20"],
                false: ["hover:bg-orange", "hover:bg-opacity-10"],
            },
        },
    }
);

const textStyles = cva([], {
    variants: {
        active: {
            true: ["text-orange"],
            false: ["text-black"],
        },
    },
});

const chevronStyles = cva(["w-6 transform transition-transform", "cursor-pointer"], {
    variants: {
        treeOpen: {
            true: ["rotate-90"],
            false: ["rotate-0"],
        },
    },
});

interface PageEntryProps {
    active: boolean;
    name: string;
    level: number;
    route?: string;
    onClick?: () => void;
    treeSectionProps?: {
        map: PageMapItem[];
        onPageEntryClick?: () => void;
        level?: number;
    };
}

const PageEntry = ({
    active,
    name,
    level,
    route,
    onClick,
    treeSectionProps,
}: PageEntryProps) => {
    const [treeOpen, setTreeOpen] = useState(false);

    const handleExpandTree = useCallback(() => {
        setTreeOpen(!treeOpen);
    }, [treeOpen]);

    const handleEntryOpen = useCallback(() => {
        setTreeOpen(!treeOpen);
        if (!!onClick && !!route) onClick();
    }, [treeOpen, onClick, route]);

    const sharedProps = {
        className: itemStyles({ active }),
        onClick: handleEntryOpen,
    };
    const [Root, rootProps]: [ElementType, any] = route
        ? [Link, { href: route }]
        : ["div", {}];
    const resolvedLevel = Math.max(level - 1, 0);

    return (
        <div
            className="relative"
            style={{ paddingLeft: resolvedLevel * LEFT_PADDING_STEP_PIXEL }}
        >
            <div className="w-full flex">
                <Root {...sharedProps} {...rootProps}>
                    <Typography
                        truncate
                        className={{
                            root: textStyles({ active }),
                        }}
                    >
                        {name}
                    </Typography>
                </Root>
                {treeSectionProps && (
                    <ChevronRight
                        onClick={handleExpandTree}
                        className={chevronStyles({ treeOpen })}
                    />
                )}
            </div>
            {treeSectionProps && treeOpen && <Section {...treeSectionProps} />}
        </div>
    );
};

export default PageEntry;
