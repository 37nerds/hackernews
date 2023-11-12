import type { Context, Next } from "koa";

import * as uuid from "uuid";

const X_REQUEST_ID = "X-Request-Id";

export const get_request_id = (ctx: Context): string => {
    return ctx.response.get(X_REQUEST_ID) || "";
};

const request_id = () => async (ctx: Context, next: Next) => {
    const requestId = uuid.v4();
    ctx.response.set(X_REQUEST_ID, requestId);
    return await next();
};

export default request_id;
