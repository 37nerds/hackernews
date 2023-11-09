import { Context } from "koa";
import { TUser } from "./repository";
import { USERS_LOGIN, USERS_LOGOUT } from "./events";
import { BadRequestError, ServerSideError } from "@/helpers/errors";
import { emitter } from "@/base/cache";
import { times } from "@/helpers/units";

import jwt from "@/helpers/jwt";
import repository from "./repository";
import log from "@/helpers/log";
import cookie from "@/helpers/cookie";

const TOKEN_KEY = "ds_token";

export type TAuthTokenPayload = {
    username: string;
};

export const loginUser = async (ctx: Context, user: TUser) => {
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

export const logoutUser = (ctx: Context) => {
    try {
        cookie.set(ctx, TOKEN_KEY, "", 0, true);
        emitter().emit(USERS_LOGOUT);
    } catch (e: any) {
        log.debug(e);
        throw new ServerSideError("unable to set the jwt token cookie empty");
    }
};

export const verifyAuthToken = async (ctx: Context): Promise<TUser> => {
    let decoded: TAuthTokenPayload;
    try {
        const authToken = cookie.get(ctx, TOKEN_KEY);
        log.debug(authToken);
        decoded = (await jwt.verify(authToken || "")) as TAuthTokenPayload;
    } catch (e: any) {
        throw new BadRequestError(e?.message || "auth token is invalid");
    }
    return await repository.find({ username: decoded.username });
};
