import type { TError } from "@/types";

import { extract_domain_from_url } from "@/helpers/utils";
import { news_per_page } from "@/config/misc";
import { createMutation, createQuery } from "@tanstack/solid-query";
import { createGetParams, createHandleErrorMutation } from "@/helpers/primitives";

import http from "@/helpers/http";

type TNewsType = "link";

export type TNews = {
    _id: string;
    created_at: string;
    updated_at: string;
    deleted_at: null;
    title: string;
    points: number | null;
    user: string | null;
    comments_count: number;
    type: TNewsType;
    url: string;
    domain?: string;
};

export type TFilter = "day" | "newest" | "home";

export const NEWSES_FETCH = "newses-fetch";

export const createGetNewsesQuery = (filter: TFilter = "home") => {
    const { day, page } = createGetParams();

    const q = createQuery<TNews[], TError>(() => ({
        queryFn: () => {
            const queries: Record<string, string | number> = {
                per_page: news_per_page,
                page: page(),
                filter,
            };
            if (filter === "day") {
                queries["value"] = day();
            }
            return http.get_wq(`/newses`, queries, 200);
        },
        queryKey: filter === "day" ? [NEWSES_FETCH, filter, page(), day()] : [NEWSES_FETCH, filter, page()],
        retry: false,
    }));

    const newses = () => q.data || [];
    const loading = () => q.isLoading;

    return { newses, loading, page, day };
};

export const createSaveNewsMutation = () => {
    return createHandleErrorMutation(
        createMutation<TNews, TError, { title: string; url: string; text: string }>(() => ({
            mutationFn: d => http.post("/newses", { ...d, type: "link", domain: extract_domain_from_url(d.url) }, 201),
            mutationKey: ["save-news"],
        })),
    );
};
