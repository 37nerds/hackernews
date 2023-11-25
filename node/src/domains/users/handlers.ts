import type { TAddHideBodySchema, TDeleteHideQuerySchema, TGetHiddenQuerySchema } from "./schemas";
import type { TResetPasswordBodySchema, TUpdateProfileBodySchema, TRegisterOrLoginUserBodySchema } from "./schemas";
import type { TChangePasswordBodySchema, TForgotPasswordBodySchema, TGetUserQuerySchema } from "./schemas";
import type { Context } from "koa";
import type { TUser } from "@/repos/users";
import type { TToken, TTokenType } from "@/repos/tokens";

import { BadRequestError } from "@/helpers/errors";
import { login_user, logout_user } from "./logic";
import { reply } from "@/helpers/units";
import { to_object_id, to_string_id } from "@/base/repo";
import { return_logged_user, return_user } from "./schemas";

import token_repo from "@/repos/tokens";
import dayjs from "dayjs";
import user_repo from "@/repos/users";
import crypto from "@/helpers/crypto";
import forgot_password_alert from "@/jobs/forgot_password_alert";
import jwt from "@/helpers/jwt";
import story_repo from "@/repos/stories";

export const register = async (ctx: Context) => {
    const user = await user_repo.insert(ctx.request.body as TRegisterOrLoginUserBodySchema);
    await login_user(ctx, user);
    return reply(ctx, 201, return_user(user));
};

export const login = async (ctx: Context) => {
    const { username, password } = (ctx.request.body as TRegisterOrLoginUserBodySchema) || {};
    const user = await user_repo.find({ username });
    if (!(await crypto.compare(user?.password || "", password))) {
        throw new BadRequestError("invalid credentials", { password: "incorrect credentials" });
    }
    await login_user(ctx, user);
    return reply(ctx, 200, return_user(user));
};

export const logout = async (ctx: Context) => {
    logout_user(ctx);
    return reply(ctx, 204);
};

export const profile = async (ctx: Context) => {
    return reply(ctx, 200, return_user(ctx.user));
};

export const update_profile = async (ctx: Context) => {
    const loggedUser = ctx.user;
    const payload = ctx.request.body as TUpdateProfileBodySchema;
    const updatedProfile = await user_repo.update(to_string_id(loggedUser._id), payload);
    return reply(ctx, 200, return_user(updatedProfile));
};

export const change_password = async (ctx: Context) => {
    const loggedUser = ctx.user;
    const payload = ctx.request.body as TChangePasswordBodySchema;

    if (!(await crypto.compare(loggedUser.password, payload.current_password))) {
        throw new BadRequestError("Invalid password");
    }

    await user_repo.update(to_string_id(loggedUser._id), { password: payload.new_password });
    return reply(ctx, 200, {});
};

type TForgotJWTPayload = {
    email: string;
};

export const generate_token = async (type: TTokenType, payload: object, expires_in_hours?: number): Promise<TToken> => {
    const token = await jwt.generate(payload, expires_in_hours);
    return await token_repo.insert({ type, token });
};

export const forgot_password = async (ctx: Context) => {
    const payload = ctx.request.body as TForgotPasswordBodySchema;
    let user: TUser;
    try {
        user = await user_repo.find_by_email(payload.email);
    } catch (e: any) {
        e.message = "invalid email";
        throw e;
    }
    const token = await generate_token("forgot-password", { email: payload.email } as TForgotJWTPayload, 24);
    forgot_password_alert({
        token: token.token,
        email: payload.email,
        username: user.username,
        expiration_time: dayjs(token.created_at).add(24, "hour").toISOString(),
    });
    return reply(ctx, 200, {});
};

export const reset_password = async (ctx: Context) => {
    const payload = ctx.request.body as TResetPasswordBodySchema;
    const token = await token_repo.find_by_token(payload.token);
    if (token.invalid) throw new BadRequestError("token is invalid!");
    let jwt_payload: TForgotJWTPayload;
    try {
        jwt_payload = (await jwt.verify(payload.token)) as TForgotJWTPayload;
    } catch (e: any) {
        throw new BadRequestError("token is invalid!!");
    }
    const user = await user_repo.find_by_email(jwt_payload.email);
    await user_repo.update(to_string_id(user._id), { password: payload.password });
    await token_repo.destroy(to_string_id(token._id));
    return reply(ctx, 200, { message: "password successfully updated" });
};

export const index = async (ctx: Context) => {
    const { id, username } = (ctx.request.query as TGetUserQuerySchema) || {};
    if (id) {
        const user = await user_repo.find_by_id(id as string);
        return reply(ctx, 200, return_user(user));
    }
    if (username) {
        const user = await user_repo.find_by_username(username as string);
        return reply(ctx, 200, return_user(user));
    }

    const users = await user_repo.finds();
    return reply(
        ctx,
        200,
        users.map((user) => return_user(user)),
    );
};

export const add_hide = async (ctx: Context) => {
    let user = ctx.user;
    const payload = ctx.request.body as TAddHideBodySchema;

    if ((user?.hidden_story || []).find((id) => id === payload.story_id)) {
        return reply(ctx, 400, { message: "invalid hidden story" });
    }

    user = await user_repo.update(to_string_id(user._id), {
        hidden_story: [...(user?.hidden_story || []), payload.story_id],
    });

    return reply(ctx, 200, return_logged_user(user));
};

export const remove_hide = async (ctx: Context) => {
    let user = ctx.user;
    const payload = ctx.request.query as TDeleteHideQuerySchema;

    if (!(user?.hidden_story || []).find((id) => id === payload.story_id)) {
        return reply(ctx, 400, { message: "invalid hidden story" });
    }

    user = await user_repo.update(to_string_id(user._id), {
        hidden_story: user.hidden_story?.filter((story_id) => story_id !== payload.story_id) || [],
    });

    return reply(ctx, 200, return_logged_user(user));
};

export const get_hidden_stories = async (ctx: Context) => {
    const queries = ctx.request.query as TGetHiddenQuerySchema;

    const per_page = Number(queries?.per_page) || 20;
    const page = Number(queries?.page) || 1;

    const stories = await story_repo.finds(
        { _id: { $in: ctx.user?.hidden_story?.map((id) => to_object_id(id)) || [] } },
        { per_page, page },
    );

    return reply(ctx, 200, stories);
};
