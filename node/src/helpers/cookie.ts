import type { Context } from "koa";

import env from "@/configs/env";

const cookie = {
    set: (
        ctx: Context,
        key: string,
        value: string,
        age_in_milliseconds: number = 0,
        http_only: boolean = false,
    ) => {
        ctx.cookies.set(key, value, {
            maxAge: age_in_milliseconds,
            httpOnly: http_only,
            secure: env.NODE_ENV !== "dev",
            sameSite: "none",
            secureProxy: true,
        });
    },
    get: (ctx: Context, key: string) => {
        return ctx.cookies.get(key);
    },
};

export default cookie;
