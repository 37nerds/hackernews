import { TError } from "@/types";
import { createMutation, createQuery } from "@tanstack/solid-query";
import { createSignal } from "solid-js";

import http from "@/helpers/http";
import createHandleErrorMutation from "@/primitives/createHandleErrorMutation";

export type TUser = {
    _id: string;
    username: string;
    karma: number;
    about: string;
    createdAt: string;
};

export type TLoggedUser = {
    _id: string;
    username: string;
    karma: number;
    about: string;
    createdAt: string;
    deletedAt: string | null;
    delay: number;
    minaway: number;
    maxvisit: number;
    noprocrast: boolean;
    showdead: boolean;
    email: string;
};

type TRegisterOrLogin = {
    username: string;
    password: string;
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

export const createProfileQuery = () => {
    return createQuery<TLoggedUser, TError>(() => ({
        queryFn: () => http.get("/users/profile", 200),
        queryKey: ["profile"],
        retry: false,
    }));
};

export const createUpdateProfileMutation = () => {
    const m = createMutation<TLoggedUser, TError, TUpdateProfile>(() => ({
        mutationFn: d => http.patch("/users/profile", d, 200),
        mutationKey: ["update_profile"],
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
        queryKey: ["user_by_username", username],
        retry: false,
        enabled: enabled(),
    }));
    return { userByUsernameQuery, setEnabled };
};
