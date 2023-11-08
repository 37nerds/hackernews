import { Context, Next } from "koa";
import { HttpError, UnknownError } from "@/helpers/errors";
import { isDev } from "@/helpers/units";
import { TError } from "./types";

import log from "@/helpers/log";

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
                stack: isDev() ? error.stack : undefined,
            } as TError;
            log.debug(e);
        }
    };
};

export default eh;
