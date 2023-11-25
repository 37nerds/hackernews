import type { TError } from "@/types";
import type { TFilter, TStory } from "@/queries/stories.ts";

import { createEffect, createSignal } from "solid-js";
import { createMutation, createQuery, useQueryClient } from "@tanstack/solid-query";
import { createGetParams, createHandleErrorMutation } from "@/helpers/primitives";
import { NEWSES_FETCH } from "@/queries/stories.ts";
import { useLoggedUser } from "@/contexts/logged_user.tsx";
import { useLocation } from "@solidjs/router";

import http from "@/helpers/http";
import { story_per_page } from "@/config/misc";

export type TUser = {
    _id: string;
    username: string;
    karma: number;
    about: string;
    created_at: string;
};

export type TLoggedUser = {
    _id: string;
    username: string;
    karma: number;
    about: string;
    created_at: string;
    deleted_at: string | null;
    delay: number;
    minaway: number;
    maxvisit: number;
    noprocrast: boolean;
    showdead: boolean;
    email: string;
    hidden_story?: string[];
    voted_story?: string[];
};

type TRegisterOrLogin = {
    username: string;
    password: string;
};

export const createRegisterMutation = () => {
    const m = createMutation<TLoggedUser, TError, TRegisterOrLogin>(() => ({
        mutationFn: d => http.post("/users/register", d, 201),
        mutationKey: ["register"],
    }));
    createHandleErrorMutation(m);
    return m;
};

export const createLoginMutation = () => {
    return createMutation<TLoggedUser, TError, TRegisterOrLogin>(() => ({
        mutationFn: d => http.post("/users/login", d, 200),
        mutationKey: ["login"],
    }));
};

export const PROFILE_FETCH = "profile";

export const createProfileQuery = () => {
    return createQuery<TLoggedUser, TError>(() => ({
        queryFn: () => http.get("/users/profile", 200),
        queryKey: [PROFILE_FETCH],
        retry: false,
    }));
};

type TUpdateProfile = {
    email?: string;
    about?: string;
    showdead?: boolean;
    noprocrast?: boolean;
    maxvisit?: number;
    minaway?: number;
    delay?: number;
};

export const createUpdateProfileMutation = () => {
    const m = createMutation<TLoggedUser, TError, TUpdateProfile>(() => ({
        mutationFn: d => http.patch("/users/profile", d, 200),
        mutationKey: ["update-profile"],
    }));
    createHandleErrorMutation(m);
    return m;
};

export const createLogoutMutation = () => {
    const m = createMutation<null, TError, null>(() => ({
        mutationFn: () => http.delete("/users/logout", 204),
        mutationKey: ["logout"],
    }));
    createHandleErrorMutation(m);
    return m;
};

export const createUserByUsernameQuery = (username: string) => {
    const [enabled, setEnabled] = createSignal(false);
    const userByUsernameQuery = createQuery<TUser, TError>(() => ({
        queryFn: () => http.get(`/users?username=${username}`, 200),
        queryKey: ["user-by-username", username],
        retry: false,
        enabled: enabled(),
    }));
    return { userByUsernameQuery, setEnabled };
};

type TChangePasswordPayload = { current_password: string; new_password: string };

export const createChangePasswordMutation = () => {
    const m = createMutation<null, TError, TChangePasswordPayload>(() => ({
        mutationFn: d => http.patch("/users/change-password", d, 200),
        mutationKey: ["change-password"],
    }));
    createHandleErrorMutation(m);
    return m;
};

export const createForgotPasswordMutation = () => {
    const m = createMutation<null, TError, { email: string }>(() => ({
        mutationFn: d => http.post("/users/forgot-password", d, 200),
        mutationKey: ["forgot-password"],
    }));
    createHandleErrorMutation(m);
    return m;
};

export const createResetPasswordMutation = () => {
    const m = createMutation<null, TError, { password: string; token: string }>(() => ({
        mutationFn: d => http.patch("/users/reset-password", d, 200),
        mutationKey: ["reset-password"],
    }));
    createHandleErrorMutation(m);
    return m;
};

const HIDDEN_NEWSES_FETCH = "hidden-stories";

export const createGetHiddenNewsesQuery = () => {
    const { page } = createGetParams();

    const q = createQuery<TStory[], TError>(() => ({
        queryFn: () => {
            const queries: Record<string, string | number> = {
                per_page: story_per_page,
                page: page(),
            };
            return http.get_wq(`/users/hidden`, queries, 200);
        },
        queryKey: [HIDDEN_NEWSES_FETCH, page()],
        retry: false,
    }));

    const stories = () => q.data || [];
    const loading = () => q.isLoading;

    createEffect(() => {
        console.log(stories());
    });

    return { stories, loading, page };
};

export const createAddHideMutation = () => {
    const loggedUser = useLoggedUser();
    const qc = useQueryClient();

    const { day, page } = createGetParams();

    const m = createMutation<TLoggedUser, TError, { story_id: string; operation: "remove" | "add" }>(() => ({
        mutationFn: d =>
            d.operation === "add"
                ? http.post("/users/hidden", { story_id: d.story_id }, 200)
                : http.delete(`/users/hidden/?story_id=${d.story_id}`, 200),
        mutationKey: ["hidden"],
        onSuccess: d => {
            loggedUser?.setData(d);
            qc.invalidateQueries({ queryKey: [NEWSES_FETCH, "home" as TFilter, page()] });
            qc.invalidateQueries({ queryKey: [NEWSES_FETCH, "newest" as TFilter, page()] });
            qc.invalidateQueries({ queryKey: [NEWSES_FETCH, "day" as TFilter, page(), day()] });
            qc.invalidateQueries({ queryKey: [NEWSES_FETCH, "day" as TFilter, page(), day()] });
            qc.invalidateQueries({ queryKey: [HIDDEN_NEWSES_FETCH, 1] });
            qc.invalidateQueries({ queryKey: [HIDDEN_NEWSES_FETCH, page()] });
        },
    }));

    createHandleErrorMutation(m);

    const loading = () => m.isPending;
    const mutate = () => m.mutate;

    return { loading, mutate };
};

export const createGetPathname = () => {
    const location = useLocation();
    const pathname = () => location.pathname;
    return pathname;
};
