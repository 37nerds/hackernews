import type { TError } from "@/types";

import { news_per_page } from "@/config/misc";
import { createMutation, createQuery } from "@tanstack/solid-query";
import { createSignal } from "solid-js";

import http from "@/helpers/http";
import createHandleErrorMutation from "@/primitives/createHandleErrorMutation";

export type TNews = {
    _id: number;
    created_at: string;
    updated_at: string;
    deleted_at: null;
    title: string;
    points: number | null;
    user: string | null;
    time: number;
    time_ago: string;
    comments_count: number;
    type: string;
    url: string;
    domain?: string;
};

export type TSort = "newest" | "home";

export const createGetNewsesQuery = (sort: TSort = "home") => {
    const [page, setPage] = createSignal<number>(1);

    const query = createQuery<TNews[], TError>(() => ({
        queryFn: () => http.get(`/newses?per_page=${news_per_page}&page=${page()}&sort=${sort}`, 200),
        queryKey: ["get-newses", page(), sort],
        retry: false,
    }));

    return { query, setPage };
};

export const createSaveNewsMutation = () => {
    return createHandleErrorMutation(
        createMutation<TNews, TError, { title: string; url: string; text: string }>(() => ({
            mutationFn: d => http.post("/newses", d, 201),
            mutationKey: ["save-news"],
        })),
    );
};