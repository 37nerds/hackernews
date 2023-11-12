import type { Context, Next } from "koa";

import { verify_auth_token } from "@/domains/users/logic";

import eh from "@/base/eh";

const protect = () => {
    return eh(async (ctx: Context, next: Next) => {
        ctx.user = await verify_auth_token(ctx);
        return await next();
    });
};

export default protect;
