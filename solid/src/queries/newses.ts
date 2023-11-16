import type { TError } from "@/types";

import { useSearchParams } from "@solidjs/router";
import { format_to_param_date } from "@/helpers/time";
import { extract_domain_from_url } from "@/helpers/utils";
import { news_per_page } from "@/config/misc";
import { createMutation } from "@tanstack/solid-query";
import { createEffect, createResource } from "solid-js";
import { createHandleErrorMutation } from "@/helpers/primitives";

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

export type TSort = "newest" | "home";
export type TFilter = "date";

export const createGetNewsesQuery = (args: { sort?: TSort; filter?: TFilter }) => {
    const sort = args.sort || "newest";
    const filter = args.filter || "";

    const [searchParams] = useSearchParams();

    const page = () => Number(searchParams.page) || 1;
    const date = () => searchParams.date || format_to_param_date(Date.now());

    const [data, { refetch }] = createResource<TNews[]>(
        () =>
            new Promise(resolve => {
                setTimeout(() => {
                    resolve(
                        http.get(
                            `/newses?per_page=${news_per_page}&page=${page()}&sort=${sort}${
                                filter ? `&filter=${filter}&filter_value=${date()}` : ""
                            }`,
                            200,
                        ),
                    );
                }, 2000);
            }),
    );

    createEffect(() => {
        if (page()) refetch();
    });

    const newses = () => data() || [];
    const loading = () => data.loading;

    return { newses, loading, page, date };
};

export const createSaveNewsMutation = () => {
    return createHandleErrorMutation(
        createMutation<TNews, TError, { title: string; url: string; text: string }>(() => ({
            mutationFn: d => http.post("/newses", { ...d, type: "link", domain: extract_domain_from_url(d.url) }, 201),
            mutationKey: ["save-news"],
        })),
    );
};
