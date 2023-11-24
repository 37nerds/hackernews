import type { TError } from "@/types";

import { extract_domain_from_url } from "@/helpers/utils";
import { news_per_page } from "@/config/misc";
import { createMutation, createQuery, useQueryClient } from "@tanstack/solid-query";
import { createGetParams, createHandleErrorMutation } from "@/helpers/primitives";

import http from "@/helpers/http";
import { PROFILE_FETCH } from "./users";

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

export const createVoteMutation = () => {
    const qc = useQueryClient();

    const { day, page } = createGetParams();

    const m = createMutation<TNews, TError, { news_id: string; operation: "add" | "remove" }>(() => ({
        mutationFn: d =>
            d.operation === "add"
                ? http.patch("/newses/upvote", { news_id: d.news_id }, 200)
                : http.patch("/newses/downvote", { news_id: d.news_id }, 200),
        mutationKey: ["news-vote"],
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: [PROFILE_FETCH] });
            qc.invalidateQueries({ queryKey: [NEWSES_FETCH, "home" as TFilter, page()] });
            qc.invalidateQueries({ queryKey: [NEWSES_FETCH, "newest" as TFilter, page()] });
            qc.invalidateQueries({ queryKey: [NEWSES_FETCH, "day" as TFilter, page(), day()] });
            qc.invalidateQueries({ queryKey: [NEWSES_FETCH, "day" as TFilter, page(), day()] });
        },
    }));
    createHandleErrorMutation(m);
    return m;
};
