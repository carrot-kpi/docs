import React from "react";
import { FooterLink } from "commons/constants";
import { Typography } from "@carrot-kpi/ui";

const Links = ({ title, links }: FooterLink) => {
    return (
        <ul className="w-40">
            <Typography
                uppercase
                weight="medium"
                className={{ root: "tracking-wide" }}
            >
                {title}
            </Typography>
            <div className="mt-6 space-y-3">
                {links.map(({ Component, to, title }) => {
                    const content = (
                        <Typography
                            variant="sm"
                            className={{
                                root: "text-white cursor-pointer hover:underline",
                            }}
                        >
                            {title}
                        </Typography>
                    );
                    return !!Component ? (
                        <Component to={to} className="block" key={to}>
                            {content}
                        </Component>
                    ) : (
                        <a href={to} className="block" key={to}>
                            {content}
                        </a>
                    );
                })}
            </div>
        </ul>
    );
};

export default Links;
