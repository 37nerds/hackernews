import {
    TChangePasswordBodySchema,
    TForgotPasswordBodySchema,
    TGetUserQuerySchema,
    TRegisterOrLoginUserBodySchema,
    TResetPasswordBodySchema,
    TUpdateLoggedUserProfile,
    returnLoggedUser,
    returnUser,
} from "./schemas";

import { Context } from "koa";
import { reply } from "@/helpers/units";
import { loginUser, logoutUser } from "./logic";
import { BadRequestError } from "@/helpers/errors";
import { toStringId } from "@/base/repository";
import { generateToken } from "../tokens/logic";

import dayjs from "dayjs";
import * as repository from "./repository";
import crypto from "@/helpers/crypto";
import forgot_password_alert from "@/jobs/forgot_password_alert";

export const register = async (ctx: Context) => {
    const user = await repository.insert(ctx.request.body as TRegisterOrLoginUserBodySchema);
    await loginUser(ctx, user);
    return reply(ctx, 201, returnLoggedUser(user));
};

export const login = async (ctx: Context) => {
    const { username, password } = (ctx.request.body as TRegisterOrLoginUserBodySchema) || {};
    const user = await repository.find({ username });
    if (!(await crypto.compare(user?.password || "", password))) {
        throw new BadRequestError("invalid credentials", { password: "incorrcet credentails" });
    }
    await loginUser(ctx, user);
    return reply(ctx, 200, returnLoggedUser(user));
};

export const logout = async (ctx: Context) => {
    logoutUser(ctx);
    return reply(ctx, 204);
};

export const profile = async (ctx: Context) => {
    return reply(ctx, 200, returnLoggedUser(ctx.user));
};

export const updateProfile = async (ctx: Context) => {
    const loggedUser = ctx.user;
    const payload = ctx.request.body as TUpdateLoggedUserProfile;
    const updatedProfile = await repository.update(toStringId(loggedUser._id), payload);
    return reply(ctx, 200, returnLoggedUser(updatedProfile));
};

export const changePassword = async (ctx: Context) => {
    const loggedUser = ctx.user;
    const payload = ctx.request.body as TChangePasswordBodySchema;

    if (!(await crypto.compare(loggedUser.password, payload.current_password))) {
        throw new BadRequestError("Invalid password");
    }

    await repository.update(toStringId(loggedUser._id), { password: payload.new_password });
    return reply(ctx, 200, {});
};

export const forgotPassword = async (ctx: Context) => {
    const payload = ctx.request.body as TForgotPasswordBodySchema;
    let user: repository.TUser;
    try {
        user = await repository.findByEmail(payload.email);
    } catch (e: any) {
        e.message = "invalid email";
        throw e;
    }
    const token = await generateToken("forgot-password", { email: payload.email }, 24);
    forgot_password_alert({
        token: token.token,
        email: payload.email,
        username: user.username,
        expiration_time: dayjs(token.createdAt).add(24, "hour").toISOString(),
    });
    return reply(ctx, 200, {});
};

export const resetPassword = async (ctx: Context) => {
    const payload = ctx.request.body as TResetPasswordBodySchema;

    console.log(payload);
    return reply(ctx, 400, { message: "not sure" });
};

export const index = async (ctx: Context) => {
    const { id, username } = (ctx.request.query as TGetUserQuerySchema) || {};
    if (id) {
        const user = await repository.findById(id as string);
        return reply(ctx, 200, returnUser(user));
    }
    if (username) {
        const user = await repository.findByUsername(username as string);
        return reply(ctx, 200, returnUser(user));
    }

    const users = await repository.finds();
    return reply(
        ctx,
        200,
        users.map((user) => returnUser(user)),
    );
};

// export const save = async (ctx: Context) => {
//     const user = await usersRepo.insert(ctx.request.body as TInsertUserBody);
//     return reply(ctx, 201, userResponse(user));
// };
//
// export const update = async (ctx: Context) => {
//     const { id } = (ctx.request.query as TUpdateUserQuery) || {};
//     const user = await usersRepo.update(id as string, ctx.request.body as TUpdateUserBody);
//     return reply(ctx, 200, userResponse(user));
// };
//
// export const destroy = async (ctx: Context) => {
//     const { id } = (ctx.request.query as TDeleteUserQuery) || {};
//     await usersRepo.destroy(id as string);
//     return reply(ctx, 204);
// };
//
//
//
