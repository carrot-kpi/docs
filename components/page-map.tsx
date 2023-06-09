import { Typography } from "@carrot-kpi/ui";
import Link from "next/link";
import { Heading } from "nextra";
import { timeAgoHumanized } from "utils/dates";
import EditIcon from "./icons/edit";
import { cva } from "class-variance-authority";

const rootStyles = cva([
    "w-full",
    "md:w-1/3",
    "flex",
    "flex-col",
    "gap-3",
    "py-6",
    "border-l",
    "border-gray-500",
]);

interface PageMapProps {
    headings: Heading[];
    pageFilePath: string;
    timestamp: number;
    className?: {
        root?: string;
    };
}

const PageMap = ({
    headings,
    pageFilePath,
    timestamp,
    className,
}: PageMapProps) => {
    const filteredHeadings = headings.filter((heading) => heading.depth > 1);

    return (
        <div className={rootStyles({ className: className?.root })}>
            {filteredHeadings.length > 0 && (
                <>
                    <div className="hidden md:block w-full px-6 mb-3">
                        <Typography
                            weight="medium"
                            uppercase
                            className={{ root: "mb-2" }}
                        >
                            On this page
                        </Typography>
                        <div className="flex flex-col gap-2">
                            {filteredHeadings.map((heading) => {
                                return (
                                    <Link
                                        key={heading.id}
                                        href={`#${heading.id}`}
                                    >
                                        <Typography>{heading.value}</Typography>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                    <div className="hidden md:block w-full border-b border-gray-500 mb-3" />
                </>
            )}
            <div className="flex flex-col items-center md:items-start gap-3 px-6">
                <a
                    href={`https://github.com/carrot-kpi/docs/tree/main/${pageFilePath}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <div className="flex items-center gap-2">
                        <EditIcon className="w-5" />
                        <Typography>Edit page on GitHub</Typography>
                    </div>
                </a>
                <Typography className={{ root: "text-gray-600" }}>
                    Last modified {timeAgoHumanized(timestamp)}
                </Typography>
            </div>
        </div>
    );
};

export default PageMap;
