import type { Context } from "koa";
import type { TGetNewsQuerySchema } from "./schemas";

import { return_news } from "./schemas";
import { xr } from "@/helpers/units";

import news_repository from "./repository";

export const index = async (ctx: Context) => {
    const { id } = (ctx.request.query as TGetNewsQuerySchema) || {};
    if (id) {
        const news = await news_repository.find_by_id(id as string);
        return xr(ctx, 200, return_news(news));
    }
    const newses = (await news_repository.finds()).map((n) => return_news(n));
    return xr(ctx, 200, newses);
};
