import { FunctionComponent } from "react";

export const DEFAULT_LOCALE = "en-US";

export interface FooterLink {
    Component?: FunctionComponent<any>;
    title: string;
    links: {
        Component?: FunctionComponent<any>;
        title: string;
        to: string;
    }[];
}

export const FOOTER_LINKS: FooterLink[] = [
    {
        title: "About",
        links: [
            {
                title: "FAQ",
                to: "/faq",
            },
            {
                title: "Twitter",
                to: "/twitter",
            },
        ],
    },
    {
        title: "Community",
        links: [
            {
                title: "Discord",
                to: "/Discord",
            },
            // {
            //     title: "Blog",
            //     to: "/Blog",
            // },
            // {
            //     title: "Jobs",
            //     to: "/jobs",
            // },
            // {
            //     title: "Brand Assets",
            //     to: "/brand-assets",
            // },
        ],
    },
    {
        title: "Documentation",
        links: [
            {
                title: "DIY Liq. Mining",
                to: "/diy-liq-mining",
            },
            {
                title: "Roadmap",
                to: "/Roadmap",
            },
            {
                title: "Audits",
                to: "/audits",
            },
            {
                title: "Token",
                to: "/token",
            },
        ],
    },
    {
        title: "Analytics",
        links: [
            {
                title: "Dune",
                to: "https://dune.com/hagaetc/dxdao",
            },
        ],
    },
];
