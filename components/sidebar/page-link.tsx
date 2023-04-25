import { Typography } from "@carrot-kpi/ui";
import { cva } from "class-variance-authority";
import Link from "next/link";

const itemStyles = cva(["w-full px-3 py-2 rounded-xl transition"], {
    variants: {
        active: {
            true: ["bg-orange", "bg-opacity-20", "text-orange"],
            false: ["hover:bg-orange", "hover:bg-opacity-10"],
        },
    },
});

interface PageLinkProps {
    active: boolean;
    name: string;
    route: string;
}

const PageLink = ({ active, name, route }: PageLinkProps) => {
    return (
        <Link key={name} href={route}>
            <Typography
                weight={active ? "medium" : "normal"}
                className={{
                    root: itemStyles({ active }),
                }}
            >
                {name}
            </Typography>
        </Link>
    );
};

export default PageLink;
