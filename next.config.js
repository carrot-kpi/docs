/** @type {import("nextra").NextraConfig} */
const nextraConfig = {
    theme: "./components/theme.tsx",
};

const withNextra = require("nextra")(nextraConfig);

/** @type {import("next").} */
const nextConfig = {};

module.exports = withNextra(nextConfig);
