import { backend_api_base_url } from "@/config/env";

type TMethod = "GET" | "POST" | "PATCH" | "DELETE";

const http = {
    json: async (endpoint: string, method: TMethod, body: object | null, happy: number) => {
        const response = await fetch(backend_api_base_url + endpoint, {
            method,
            body: body ? JSON.stringify(body) : null,
            headers: { "Content-type": "application/json" },
            credentials: "include",
        });
        const payload = response.status === 204 ? {} : await response.json();
        if (happy !== response.status) throw payload;
        return payload;
    },
    get: (endpoint: string, happy: number) => http.json(endpoint, "GET", null, happy),
    get_wq: (endpoint: string, queries: Record<string, string>, happy: number) => {
        const qs = Object.keys(queries).reduce((c, k) => c + (queries[k] ? `&${k}=${queries[k]}` : ""), "?");
        return http.get(endpoint + qs, happy);
    },
    post: (endpoint: string, body: object, happy: number) => http.json(endpoint, "POST", body, happy),
    patch: (endpoint: string, body: object, happy: number) => http.json(endpoint, "PATCH", body, happy),
    delete: (endpoint: string, happy: number) => http.json(endpoint, "DELETE", null, happy),
};

export default http;
