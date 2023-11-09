import { TError } from "@/types";
import { createMutation, createQuery } from "@tanstack/solid-query";

import http from "@/helpers/http";
import createHandleErrorMutation from "@/primitives/createHandleErrorMutation";

export type TUser = {
    createdAt: string;
    deletedAt: string | null;
    updatedAt: string;
    username: string;
    _id: string;
};

type TRegisterOrLogin = {
    username: string;
    password: string;
};

export const createRegisterMutation = () => {
    const m = createMutation<TUser, TError, TRegisterOrLogin>(() => ({
        mutationFn: d => http.post("/users/register", d, 201),
        mutationKey: ["register"],
    }));
    createHandleErrorMutation(m);
    return m;
};

export const createLoginMutation = () => {
    const m = createMutation<TUser, TError, TRegisterOrLogin>(() => ({
        mutationFn: d => http.post("/users/login", d, 200),
        mutationKey: ["login"],
    }));
    return m;
};

export const createProfileQuery = () => {
    const q = createQuery<TUser, TError>(() => ({
        queryKey: ["profile"],
        queryFn: () => http.get("/users/profile", 200),
    }));
    return q;
};
