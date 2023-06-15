import { Button } from "@carrot-kpi/ui";
import React from "react";
import { CARROT_DOMAIN, FOOTER_LINKS } from "../../commons/constants";
import Links from "./links";

const Footer = () => (
    <div className="w-full bg-grid-dark px-4 xl:px-40 py-16 flex flex-col gap-8 md:flex-row justify-between bg-black dark">
        <div className="grid grid-cols-2 gap-8 xs:gap-10 md:gap-0 md:flex xl:space-x-6">
            {FOOTER_LINKS.map(({ title, links }) => (
                <Links key={title} title={title} links={links} />
            ))}
        </div>
        <div className="flex items-end">
            <Button
                href={`https://${CARROT_DOMAIN}`}
                target="_blank"
                rel="noopener noreferrer"
            >
                Carrot info page
            </Button>
        </div>
    </div>
);

export default Footer;
