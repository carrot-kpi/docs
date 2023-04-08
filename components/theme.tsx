import { Markdown } from "@carrot-kpi/ui";
import { NextraThemeLayoutProps } from "nextra";
import { Footer } from "./footer";
import Navbar from "./navbar";
import PageMap from "./page-map";
import Sidebar from "./sidebar";

const Theme = ({ children, pageOpts }: NextraThemeLayoutProps) => {
    return (
        <div className="flex h-full flex-col">
            <Navbar />
            <div className="flex dark:bg-grid-dark dark:bg-black flex-1">
                <Sidebar map={pageOpts.pageMap} />
                <div className="w-full bg-grid-light flex justify-center py-12">
                    <div className="max-w-4xl">
                        <Markdown>{children}</Markdown>
                    </div>
                </div>
                <PageMap
                    headings={pageOpts.headings}
                    pageFilePath={pageOpts.filePath}
                />
            </div>
            <Footer />
        </div>
    );
};

export default Theme;
