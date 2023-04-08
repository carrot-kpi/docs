import { Typography } from "@carrot-kpi/ui";
import { ReactNode } from "react";

interface SubtitleProps {
    children: ReactNode;
}

const Subtitle = ({ children }: SubtitleProps) => {
    return (
        <Typography
            variant="2xl"
            className={{ root: "text-gray-500 dark:text-gray-500" }}
        >
            {children}
        </Typography>
    );
};

export default Subtitle;
