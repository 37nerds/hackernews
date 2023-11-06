import { defineConfig } from "vite";

import solid from "vite-plugin-solid";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
    plugins: [solid(), tsconfigPaths()],
    server: {
        host: true,
        port: 3000,
        watch: {
            usePolling: true,
        },
    },
});
