import { z } from "zod";
import { TUser } from "./repository";

const idSchema = z.string().length(24);
const emailSchema = z.string().email();
const passwordSchema = z.string().min(6);

// schemes for payload validation
export const registerOrLoginUserBodySchema = z.object({
    username: z.string(),
    password: passwordSchema,
});

export const getUserQuerySchema = z.object({
    id: idSchema.optional(),
    username: z.string().optional(),
});

export const updateLoggedUserProfile = z.object({
    about: z.string().optional(),
    email: emailSchema.optional(),
    showdead: z.boolean().optional(),
    noprocrast: z.boolean().optional(),
    maxvisit: z.number().optional(),
    minaway: z.number().optional(),
    delay: z.number().optional(),
});

export const changePasswordBodySchema = z.object({
    current_password: passwordSchema,
    new_password: passwordSchema,
});

export const forgotPasswordBodySchema = z.object({
    email: emailSchema,
});

export const resetPasswordBodySchema = z.object({
    password: passwordSchema,
    token: z.string(),
});

export type TRegisterOrLoginUserBodySchema = z.infer<typeof registerOrLoginUserBodySchema>;
export type TGetUserQuerySchema = z.infer<typeof getUserQuerySchema>;
export type TUpdateLoggedUserProfile = z.infer<typeof updateLoggedUserProfile>;
export type TChangePasswordBodySchema = z.infer<typeof changePasswordBodySchema>;
export type TForgotPasswordBodySchema = z.infer<typeof forgotPasswordBodySchema>;
export type TResetPasswordBodySchema = z.infer<typeof resetPasswordBodySchema>;

// return users to the client
export const returnLoggedUser = (
    user: TUser,
): {
    [K in keyof TUser]: K extends "password" ? undefined : TUser[K];
} => {
    return { ...user, password: undefined };
};

export const returnUser = (
    user: TUser,
): {
    [K in keyof TUser]: K extends "password" ? undefined : TUser[K];
} => {
    return { ...user, password: undefined };
};
