import { Context, Next } from "koa";
import { Schema, z } from "zod";
import { UnknownError, ValidationError } from "@/helpers/errors";
import { TErrorRecord } from "@/base/types";

import eh from "@/base/eh";

const validate = <T, T2>(querySchema: Schema | null, bodySchema: Schema | null) => {
    return eh(async (ctx: Context, next: Next) => {
        try {
            if (querySchema) {
                ctx.request.query = querySchema.parse(ctx.request.query as T);
            }
            if (bodySchema) {
                ctx.request.body = bodySchema.parse(ctx.request.body as T2);
            }
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
