import type { TUser } from "./repository";

import { z } from "zod";
import { id_schema } from "@/base/schema";

const email_schema = z.string().email();
const password_schema = z.string().min(6);

// schemes for payload validation
export const register_or_login_user_body_schema = z.object({
    username: z.string(),
    password: password_schema,
});

export const get_user_query_schema = z.object({
    id: id_schema.optional(),
    username: z.string().optional(),
});

export const update_profile_body_schema = z.object({
    about: z.string().optional(),
    email: z.string().optional(),
    showdead: z.boolean().optional(),
    noprocrast: z.boolean().optional(),
    maxvisit: z.number().optional(),
    minaway: z.number().optional(),
    delay: z.number().optional(),
});

export const change_password_body_schema = z.object({
    current_password: password_schema,
    new_password: password_schema,
});

export const forgot_password_body_schema = z.object({
    email: email_schema,
});

export const reset_password_body_schema = z.object({
    password: password_schema,
    token: z.string(),
});

export type TRegisterOrLoginUserBodySchema = z.infer<typeof register_or_login_user_body_schema>;
export type TGetUserQuerySchema = z.infer<typeof get_user_query_schema>;
export type TUpdateProfileBodySchema = z.infer<typeof update_profile_body_schema>;
export type TChangePasswordBodySchema = z.infer<typeof change_password_body_schema>;
export type TForgotPasswordBodySchema = z.infer<typeof forgot_password_body_schema>;
export type TResetPasswordBodySchema = z.infer<typeof reset_password_body_schema>;

// return users to the client
export const return_logged_user = (
    user: TUser,
): {
    [K in keyof TUser]: K extends "password" ? undefined : TUser[K];
} => {
    return { ...user, password: undefined };
};

export const return_user = (
    user: TUser,
): {
    [K in keyof TUser]: K extends "password" ? undefined : TUser[K];
} => {
    return { ...user, password: undefined };
};
