import { Modal, TextInput, Typography } from "@carrot-kpi/ui";
import { DEFAULT_LOCALE } from "commons/constants";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { getIndexes, Result, SearchResult } from "utils/search";
import HighlightMatches from "./highlight-matches";
import X from "./icons/x";
import useDebounce from "react-use/lib/useDebounce";
import Link from "next/link";

const DIVIDER = <div className="h-[1px] w-full bg-black dark:bg-white" />;

interface SearchModalProps {
    open: boolean;
    onDismiss: () => void;
}

const SearchModal = ({ open, onDismiss }: SearchModalProps) => {
    const { locale = DEFAULT_LOCALE, basePath } = useRouter();
    const searchInputRef = useRef<HTMLInputElement>(null);

    const [loading, setLoading] = useState(false);
    // const [error, setError] = useState(false);
    const [results, setResults] = useState<SearchResult[]>([]);
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");

    useDebounce(
        () => {
            setDebouncedSearch(search);
        },
        200,
        [search]
    );

    useEffect(() => {
        if (searchInputRef.current && open) searchInputRef.current.focus();
    }, [open]);

    useEffect(() => {
        if (!open) {
            setTimeout(() => {
                setSearch("");
                setResults([]);
            }, 300);
        }
    }, [open]);

    useEffect(() => {
        let cancelled = false;
        const fetchData = async () => {
            if (!debouncedSearch) {
                setResults([]);
                return;
            }

            if (!cancelled) setLoading(true);

            try {
                const { page: pageIndex, section: sectionIndex } =
                    await getIndexes(basePath, locale);
                // Show the results for the top 5 pages
                const pageResults =
                    pageIndex.search<true>(debouncedSearch, 5, {
                        enrich: true,
                        suggest: true,
                    })[0]?.result || [];

                const results: Result[] = [];
                const pageTitleMatches: Record<number, number> = {};

                for (let i = 0; i < pageResults.length; i++) {
                    const result = pageResults[i];
                    pageTitleMatches[i] = 0;

                    // Show the top 5 results for each page
                    const sectionResults =
                        sectionIndex.search<true>(debouncedSearch, 5, {
                            enrich: true,
                            suggest: true,
                            tag: `page_${result.id}`,
                        })[0]?.result || [];

                    let isFirstItemOfPage = true;
                    const occurred: Record<string, boolean> = {};

                    for (let j = 0; j < sectionResults.length; j++) {
                        const { doc } = sectionResults[j];
                        const isMatchingTitle = doc.display !== undefined;
                        if (isMatchingTitle) {
                            pageTitleMatches[i]++;
                        }
                        const { url, title } = doc;
                        const content = doc.display || doc.content;
                        if (occurred[url + "@" + content]) continue;
                        occurred[url + "@" + content] = true;
                        results.push({
                            _page_rk: i,
                            _section_rk: j,
                            route: url,
                            prefix: isFirstItemOfPage && (
                                <div>{result.doc.title}</div>
                            ),
                            children: (
                                <>
                                    <Typography weight="medium">
                                        <HighlightMatches
                                            match={debouncedSearch}
                                            value={title}
                                        />
                                    </Typography>
                                    {content && (
                                        <Typography
                                            variant="sm"
                                            className={{
                                                root: "mt-1 text-sm leading-[1.35rem] text-gray-600 dark:text-gray-400 contrast-more:dark:text-gray-50",
                                            }}
                                        >
                                            <HighlightMatches
                                                match={debouncedSearch}
                                                value={content}
                                            />
                                        </Typography>
                                    )}
                                </>
                            ),
                        });
                        isFirstItemOfPage = false;
                    }
                }

                const resolvedResults = results
                    .sort((a, b) => {
                        // Sort by number of matches in the title.
                        if (a._page_rk === b._page_rk) {
                            return a._section_rk - b._section_rk;
                        }
                        if (
                            pageTitleMatches[a._page_rk] !==
                            pageTitleMatches[b._page_rk]
                        ) {
                            return (
                                pageTitleMatches[b._page_rk] -
                                pageTitleMatches[a._page_rk]
                            );
                        }
                        return a._page_rk - b._page_rk;
                    })
                    .map((res) => ({
                        id: `${res._page_rk}_${res._section_rk}`,
                        route: res.route,
                        prefix: res.prefix,
                        children: res.children,
                    }));

                if (!cancelled) setResults(resolvedResults);
            } catch (error) {
            } finally {
                if (!cancelled) setLoading(false);
            }
        };
        void fetchData();
        return () => {
            cancelled = false;
        };
    }, [basePath, debouncedSearch, locale]);

    const handleSearchQueryChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setSearch(event.target.value);
        },
        []
    );

    return (
        <Modal
            open={open}
            onDismiss={onDismiss}
            className={{ root: "items-start pt-20" }}
        >
            <div className="flex flex-col bg-white dark:bg-black rounded-xl m-4 w-full md:min-w-[460px] md:w-1/3 lg:w-1/4">
                <div className="p-4 flex justify-between items-center">
                    <Typography variant="2xl" weight="medium">Search</Typography>
                    <X className="cursor-pointer" onClick={onDismiss} />
                </div>
                {DIVIDER}
                <div className="p-3">
                    <TextInput
                        ref={searchInputRef}
                        id="token-search"
                        placeholder="Search content..."
                        value={search}
                        onChange={handleSearchQueryChange}
                        className={{
                            input: "w-full",
                            inputWrapper: "w-full",
                        }}
                    />
                </div>
                {DIVIDER}
                {!debouncedSearch ? (
                    <div className="h-96 flex justify-center items-center">
                        <Typography>Type something to search</Typography>
                    </div>
                ) : results.length === 0 ? (
                    <div className="h-96 flex justify-center items-center">
                        <Typography>No result found</Typography>
                    </div>
                ) : (
                    <div className="h-96 overflow-auto">
                        {results.map((result) => {
                            return (
                                <Link
                                    key={result.id}
                                    href={result.route}
                                    onClick={onDismiss}
                                >
                                    <div className="px-4 py-3">
                                        {result.children}
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                )}
            </div>
        </Modal>
    );
};

export default SearchModal;
