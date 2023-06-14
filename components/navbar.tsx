import { Typography } from "@carrot-kpi/ui";
import { PageMapItem } from "nextra";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import GitHubIcon from "./icons/github";
import SearchIcon from "./icons/search";
import Logotype from "./logotype";
import SearchModal from "./search-modal";
import Menu from "./icons/menu";
import Sidenav from "./sidenav";

interface NavbarProps {
    map: PageMapItem[];
}

const Navbar = ({ map }: NavbarProps) => {
    const searchInputRef = useRef<HTMLInputElement>(null);

    const [searchModalOpen, setSearchModalOpen] = useState(false);
    const [sideNavigationOpen, setSideNavigationOpen] = useState(false);

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

    const handleSideNavigationOpen = useCallback(() => {
        setSideNavigationOpen(true);
    }, []);

    const handleSideNavigationClose = useCallback(() => {
        setSideNavigationOpen(false);
    }, []);

    return (
        <>
            <SearchModal
                open={searchModalOpen}
                onDismiss={handleSearchModalClose}
            />
            <Sidenav
                open={sideNavigationOpen}
                map={map}
                onDismiss={handleSideNavigationClose}
            />
            <div className="fixed md:relative w-full bg-orange flex items-center border-b border-black md:border-none justify-between px-4 xl:px-40 py-6">
                <div className="flex gap-4 items-center">
                    <Menu
                        onClick={handleSideNavigationOpen}
                        className="flex md:hidden w-7 h-7 cursor-pointer"
                    />
                    <Link href="/" className="flex items-center gap-4">
                        <Logotype className="w-auto h-7 md:h-8 text-black" />
                        <div className="h-6 border-r border-black" />
                        <Typography
                            uppercase
                            weight="medium"
                            className={{ root: "tracking-widest" }}
                        >
                            Docs
                        </Typography>
                    </Link>
                </div>
                <div className="flex items-center gap-4">
                    <div onClick={handleSearchModalOpen}>
                        <SearchIcon className="w-7 h-7 cursor-pointer text-black hover:opacity-50 transition-opacity" />
                    </div>
                    <a
                        href="https://github.com/carrot-kpi"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hidden md:flex"
                    >
                        <GitHubIcon className="w-7 h-7 text-black hover:opacity-50 transition-opacity" />
                    </a>
                </div>
            </div>
        </>
    );
};

export default Navbar;
