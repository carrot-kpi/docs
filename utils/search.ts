import { Document } from "flexsearch";
import type { ReactNode } from "react";

export type SearchResult = {
    children: ReactNode;
    id: string;
    prefix?: ReactNode;
    route: string;
};

type SectionIndex = Document<
    {
        id: string;
        url: string;
        title: string;
        pageId: string;
        content: string;
        display?: string;
    },
    ["title", "content", "url", "display"]
>;

type PageIndex = Document<
    {
        id: number;
        title: string;
        content: string;
    },
    ["title"]
>;

export type Result = {
    _page_rk: number;
    _section_rk: number;
    route: string;
    prefix: ReactNode;
    children: ReactNode;
};

type NextraData = {
    [route: string]: {
        title: string;
        data: Record<string, string>;
    };
};

export const PAGE_INDEX: PageIndex = new Document({
    cache: 100,
    tokenize: "full",
    document: {
        id: "id",
        index: "content",
        store: ["title"],
    },
    context: {
        resolution: 9,
        depth: 2,
        bidirectional: true,
    },
});

export const SECTION_INDEX: SectionIndex = new Document({
    cache: 100,
    tokenize: "full",
    document: {
        id: "id",
        index: "content",
        tag: "pageId",
        store: ["title", "content", "url", "display"],
    },
    context: {
        resolution: 9,
        depth: 2,
        bidirectional: true,
    },
});

export interface Indexes {
    page: PageIndex;
    section: SectionIndex;
}

const INDEXES: Record<string, Indexes> = {};

export const getIndexes = async (
    basePath: string,
    locale: string
): Promise<Indexes> => {
    const key = basePath + "@" + locale;
    if (INDEXES[key]) INDEXES[key];
    const indexes = await populateIndexes(basePath, locale);
    INDEXES[key] = indexes;
    return indexes;
};

const populateIndexes = async (
    basePath: string,
    locale: string
): Promise<Indexes> => {
    const response = await fetch(
        `${basePath}/_next/static/chunks/nextra-data-${locale}.json`
    );
    const data = (await response.json()) as NextraData;

    let pageId = 0;
    for (const route in data) {
        let pageContent = "";
        ++pageId;

        for (const heading in data[route].data) {
            const [hash, text] = heading.split("#");
            const url = route + (hash ? "#" + hash : "");
            const title = text || data[route].title;

            const content = data[route].data[heading] || "";
            const paragraphs = content.split("\n").filter(Boolean);

            SECTION_INDEX.add({
                id: url,
                url,
                title,
                pageId: `page_${pageId}`,
                content: title,
                ...(paragraphs[0] && { display: paragraphs[0] }),
            });

            for (let i = 0; i < paragraphs.length; i++) {
                SECTION_INDEX.add({
                    id: `${url}_${i}`,
                    url,
                    title,
                    pageId: `page_${pageId}`,
                    content: paragraphs[i],
                });
            }

            // Add the page itself.
            pageContent += ` ${title} ${content}`;
        }

        PAGE_INDEX.add({
            id: pageId,
            title: data[route].title,
            content: pageContent,
        });
    }

    return { page: PAGE_INDEX, section: SECTION_INDEX };
};
