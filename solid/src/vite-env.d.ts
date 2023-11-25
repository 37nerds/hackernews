/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_NODE_ENV: "dev" | "prod";
    readonly VITE_API_BASE_URL: string;
}
