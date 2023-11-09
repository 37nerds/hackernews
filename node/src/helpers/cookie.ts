import env from "@/configs/env";
import { Context } from "koa";

const cookie = {
    set: (
        ctx: Context,
        key: string,
        value: string,
        ageInMiliseconds: number = 0,
        httpOnly: boolean = false,
    ) => {
        ctx.cookies.set(key, value, {
            maxAge: ageInMiliseconds,
            httpOnly: httpOnly,
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
