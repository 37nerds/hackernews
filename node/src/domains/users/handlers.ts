import type { TRegisterOrLoginUserBodySchema, TResetPasswordBodySchema, TUpdateProfileBodySchema } from "./schemas";
import type { TChangePasswordBodySchema, TForgotPasswordBodySchema, TGetUserQuerySchema } from "./schemas";
import type { Context } from "koa";
import type { TUser } from "./repository";

import { BadRequestError } from "@/helpers/errors";
import { login_user, logout_user } from "./logic";
import { reply } from "@/helpers/units";
import { to_string_id } from "@/base/repo";
import { generate_token } from "../tokens/logic";
import { return_logged_user, return_user } from "./schemas";

import dayjs from "dayjs";
import user_repository from "./repository";
import token_repository from "@/domains/tokens/repository";
import crypto from "@/helpers/crypto";
import forgot_password_alert from "@/jobs/forgot_password_alert";
import jwt from "@/helpers/jwt";

export const register = async (ctx: Context) => {
    const user = await user_repository.insert(ctx.request.body as TRegisterOrLoginUserBodySchema);
    await login_user(ctx, user);
    return reply(ctx, 201, return_logged_user(user));
};

export const login = async (ctx: Context) => {
    const { username, password } = (ctx.request.body as TRegisterOrLoginUserBodySchema) || {};
    const user = await user_repository.find({ username });
    if (!(await crypto.compare(user?.password || "", password))) {
        throw new BadRequestError("invalid credentials", { password: "incorrect credentials" });
    }
    await login_user(ctx, user);
    return reply(ctx, 200, return_logged_user(user));
};

export const logout = async (ctx: Context) => {
    logout_user(ctx);
    return reply(ctx, 204);
};

export const profile = async (ctx: Context) => {
    return reply(ctx, 200, return_logged_user(ctx.user));
};

export const update_profile = async (ctx: Context) => {
    const loggedUser = ctx.user;
    const payload = ctx.request.body as TUpdateProfileBodySchema;
    const updatedProfile = await user_repository.update(to_string_id(loggedUser._id), payload);
    return reply(ctx, 200, return_logged_user(updatedProfile));
};

export const change_password = async (ctx: Context) => {
    const loggedUser = ctx.user;
    const payload = ctx.request.body as TChangePasswordBodySchema;

    if (!(await crypto.compare(loggedUser.password, payload.current_password))) {
        throw new BadRequestError("Invalid password");
    }

    await user_repository.update(to_string_id(loggedUser._id), { password: payload.new_password });
    return reply(ctx, 200, {});
};

type TForgotJWTPayload = {
    email: string;
};

export const forgot_password = async (ctx: Context) => {
    const payload = ctx.request.body as TForgotPasswordBodySchema;
    let user: TUser;
    try {
        user = await user_repository.find_by_email(payload.email);
    } catch (e: any) {
        e.message = "invalid email";
        throw e;
    }
    const token = await generate_token("forgot-password", { email: payload.email } as TForgotJWTPayload, 24);
    forgot_password_alert({
        token: token.token,
        email: payload.email,
        username: user.username,
        expiration_time: dayjs(token.createdAt).add(24, "hour").toISOString(),
    });
    return reply(ctx, 200, {});
};

export const reset_password = async (ctx: Context) => {
    const payload = ctx.request.body as TResetPasswordBodySchema;
    const token = await token_repository.find_by_token(payload.token);
    if (token.invalid) throw new BadRequestError("token is invalid!");
    let jwt_payload: TForgotJWTPayload;
    try {
        jwt_payload = (await jwt.verify(payload.token)) as TForgotJWTPayload;
    } catch (e: any) {
        throw new BadRequestError("token is invalid!!");
    }
    const user = await user_repository.find_by_email(jwt_payload.email);
    await user_repository.update(to_string_id(user._id), { password: payload.password });
    await token_repository.update(to_string_id(token._id), { invalid: true });
    return reply(ctx, 200, { message: "password successfully updated" });
};

export const index = async (ctx: Context) => {
    const { id, username } = (ctx.request.query as TGetUserQuerySchema) || {};
    if (id) {
        const user = await user_repository.find_by_id(id as string);
        return reply(ctx, 200, return_user(user));
    }
    if (username) {
        const user = await user_repository.find_by_username(username as string);
        return reply(ctx, 200, return_user(user));
    }

    const users = await user_repository.finds();
    return reply(
        ctx,
        200,
        users.map((user) => return_user(user)),
    );
};
