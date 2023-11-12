import type { Context, Next } from "koa";
import type { Schema } from "zod";
import type { TErrorRecord } from "@/base/types";

import { z } from "zod";
import { UnknownError, ValidationError } from "@/helpers/errors";

import eh from "@/base/eh";

const validate = <T, T2>(body_schema?: Schema | null, query_schema?: Schema | null) => {
    return eh(async (ctx: Context, next: Next) => {
        try {
            if (body_schema) ctx.request.body = body_schema.parse(ctx.request.body as T);
            if (query_schema) ctx.request.query = query_schema.parse(ctx.request.query as T2);
            return await next();
        } catch (e: any) {
            if (e instanceof z.ZodError) {
                const errors: TErrorRecord = e.errors.reduce(
                    (prv, curr) => ({ ...prv, [`${curr?.path[0]}`]: curr?.message }),
                    {},
                );
                throw new ValidationError("Payload is invalid", errors);
            } else {
                throw new UnknownError(e?.message || "");
            }
        }
    });
};

export default validate;
