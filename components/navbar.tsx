import { Typography } from "@carrot-kpi/ui";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import GitHubIcon from "./icons/github";
import SearchIcon from "./icons/search";
import Logotype from "./logotype";
import SearchModal from "./search-modal";

const Navbar = () => {
    const searchInputRef = useRef<HTMLInputElement>(null);

    const [searchModalOpen, setSearchModalOpen] = useState(false);

    useEffect(() => {
        if (searchInputRef.current && searchModalOpen)
            searchInputRef.current.focus();
    }, [searchModalOpen]);

    const handleSearchModalOpen = useCallback(() => {
        setSearchModalOpen(true);
    }, []);

    const handleSearchModalClose = useCallback(() => {
        setSearchModalOpen(false);
    }, []);

    return (
        <>
            <SearchModal
                open={searchModalOpen}
                onDismiss={handleSearchModalClose}
            />
            <div className="w-full bg-orange flex items-center justify-between px-4 xl:px-40 py-6">
                <Link href="/" className="flex items-center gap-4">
                    <Logotype className="w-auto h-8 text-black" />
                    <div className="h-8 border-r border-black" />
                    <Typography
                        uppercase
                        weight="medium"
                        className={{ root: "tracking-widest" }}
                    >
                        Docs
                    </Typography>
                </Link>
                <div className="flex items-center gap-4">
                    <div onClick={handleSearchModalOpen}>
                        <SearchIcon className="w-7 h-7 cursor-pointer text-black hover:opacity-50 transition-opacity" />
                    </div>
                    <a
                        href="https://github.com/carrot-kpi"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <GitHubIcon className="w-7 h-7 text-black hover:opacity-50 transition-opacity" />
                    </a>
                </div>
            </div>
        </>
    );
};

export default Navbar;
