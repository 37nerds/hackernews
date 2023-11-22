import type { Context, Next } from "koa";
import type { TError } from "./types";

import { HttpError, UnknownError } from "@/helps/errors";
import { is_dev } from "@/helps/units";

import log from "@/helps/log";

const eh = <T>(func: (ctx: Context, next: Next) => Promise<T>) => {
    return async (ctx: Context, next: Next) => {
        try {
            return await func(ctx, next);
        } catch (e: any) {
            let error = e;
            if (!(e instanceof HttpError)) {
                error = new UnknownError(e?.message || "");
            }
            ctx.status = error.status;
            ctx.body = {
                name: error.name,
                message: error.message,
                errors: error?.errors,
                stack: is_dev() ? error.stack : undefined,
            } as TError;
            log.debug(e);
        }
    };
};

export default eh;
