import type { TError } from "@/types";

import { extract_domain_from_url } from "@/helpers/utils";
import { story_per_page } from "@/config/misc";
import { createMutation, createQuery, useQueryClient } from "@tanstack/solid-query";
import { createGetParams, createHandleErrorMutation } from "@/helpers/primitives";
import { PROFILE_FETCH } from "./users";

import http from "@/helpers/http";
import { useLoggedUser } from "@/contexts/logged_user";
import { filter_hidden_stories } from "@/helpers/logic";

export type TStoryType = "link" | "ask" | "show" | "job";

export type TStory = {
    _id: string;
    created_at: string;
    updated_at: string;
    deleted_at: null;
    title: string;
    points: number | null;
    user: string | null;
    comments_count: number;
    type: TStoryType;
    url: string;
    domain?: string;
};

export type TFilter = "home" | "newest" | "day" | "ask" | "show" | "jobs";

export const NEWSES_FETCH = "stories-fetch";

export const createGetNewsesQuery = (filter: TFilter = "home") => {
    const { day, page } = createGetParams();

    const q = createQuery<TStory[], TError>(() => ({
        queryFn: () => {
            const queries: Record<string, string | number> = {
                per_page: story_per_page,
                page: page(),
                filter,
            };
            if (filter === "day") {
                queries["value"] = day();
            }
            return http.get_wq(`/stories`, queries, 200);
        },
        queryKey: filter === "day" ? [NEWSES_FETCH, filter, page(), day()] : [NEWSES_FETCH, filter, page()],
        retry: false,
    }));

    const logger_user = useLoggedUser();

    const stories = () => filter_hidden_stories(q.data || [], logger_user?.data()?.hidden_story || []);
    const loading = () => q.isLoading;

    return { stories, loading, page, day };
};

export const createSaveNewsMutation = () => {
    return createHandleErrorMutation(
        createMutation<TStory, TError, { type: TStoryType; title: string; url: string; text: string }>(() => ({
            mutationFn: d => http.post("/stories", { ...d, domain: extract_domain_from_url(d.url) }, 201),
            mutationKey: ["save-story"],
        })),
    );
};

export const createVoteMutation = () => {
    const qc = useQueryClient();

    const { day, page } = createGetParams();

    const m = createMutation<TStory, TError, { story_id: string; operation: "add" | "remove" }>(() => ({
        mutationFn: d =>
            d.operation === "add"
                ? http.patch("/stories/upvote", { story_id: d.story_id }, 200)
                : http.patch("/stories/downvote", { story_id: d.story_id }, 200),
        mutationKey: ["story-vote"],
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: [PROFILE_FETCH] });
            qc.invalidateQueries({ queryKey: [NEWSES_FETCH, "home" as TFilter, page()] });
            qc.invalidateQueries({ queryKey: [NEWSES_FETCH, "newest" as TFilter, page()] });
            qc.invalidateQueries({ queryKey: [NEWSES_FETCH, "day" as TFilter, page(), day()] });
            qc.invalidateQueries({ queryKey: [NEWSES_FETCH, "ask" as TFilter, page()] });
            qc.invalidateQueries({ queryKey: [NEWSES_FETCH, "show" as TFilter, page()] });
            qc.invalidateQueries({ queryKey: [NEWSES_FETCH, "jobs" as TFilter, page()] });
        },
    }));
    createHandleErrorMutation(m);
    return m;
};
