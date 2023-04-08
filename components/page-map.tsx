import { Typography } from "@carrot-kpi/ui";
import Link from "next/link";
import { Heading } from "nextra";
import EditIcon from "./icons/edit";

interface PageMapProps {
    headings: Heading[];
    pageFilePath: string;
}

const PageMap = ({ headings, pageFilePath }: PageMapProps) => {
    const filteredHeadings = headings.filter((heading) => heading.depth > 1);

    return (
        <div className="w-1/3 flex flex-col gap-3 py-6 border-l border-gray-300">
            {filteredHeadings.length > 0 && (
                <>
                    <div className="w-full px-6 mb-3">
                        <Typography
                            weight="medium"
                            uppercase
                            className={{ root: "text-gray-400 mb-2" }}
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
                    <hr className="text-gray-300 mb-3" />
                </>
            )}
            <div className="px-6">
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
            </div>
        </div>
    );
};

export default PageMap;
