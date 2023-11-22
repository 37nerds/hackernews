import type { Context } from "koa";
import type { TUser } from "@/repos/users";

import { BadRequestError, ServerSideError } from "@/helpers/errors";
import { emitter } from "@/base/single";
import { times } from "@/helpers/units";

import jwt from "@/helpers/jwt";
import user_repo from "@/repos/users";
import log from "@/helpers/log";
import cookie from "@/helpers/cookie";

export type TAuthTokenPayload = { username: string };

export const USERS_LOGIN = "login";
export const USERS_LOGOUT = "logout";

const TOKEN_KEY = "ds_token";

export const login_user = async (ctx: Context, user: TUser) => {
    try {
        const expireInHours = 24 * 30;
        const payload: TAuthTokenPayload = { username: user.username };
        const token = await jwt.generate(payload, expireInHours);
        cookie.set(ctx, TOKEN_KEY, token, times.hour * expireInHours, true);
        emitter().emit(USERS_LOGIN, user, ctx.request.ip, ctx.request.headers["user-agent"]);
    } catch (e: any) {
        log.debug(e);
        throw new ServerSideError("unable to generate or set the token cookie");
    }
};

export const logout_user = (ctx: Context) => {
    try {
        cookie.set(ctx, TOKEN_KEY, "", 0, true);
        emitter().emit(USERS_LOGOUT);
    } catch (e: any) {
        log.debug(e);
        throw new ServerSideError("unable to set the jwt token cookie empty");
    }
};

export const verify_auth_token = async (ctx: Context): Promise<TUser> => {
    let decoded: TAuthTokenPayload;
    try {
        const authToken = cookie.get(ctx, TOKEN_KEY);
        decoded = (await jwt.verify(authToken || "")) as TAuthTokenPayload;
    } catch (e: any) {
        throw new BadRequestError(e?.message || "auth token is invalid");
    }
    return await user_repo.find({ username: decoded.username });
};
