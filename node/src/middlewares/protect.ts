import { verify_auth_token } from "@/domains/users/logic";
import { Context, Next } from "koa";

import eh from "@/base/eh";

const protect = () => {
    return eh(async (ctx: Context, next: Next) => {
        ctx.user = await verify_auth_token(ctx);
        return await next();
    });
};

export default protect;
