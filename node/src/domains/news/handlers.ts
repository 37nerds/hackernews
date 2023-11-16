import type { Context } from "koa";
import type { TGetNewsQuerySchema } from "./schemas";

import { return_news } from "./schemas";
import { xr } from "@/helpers/units";

import news_repository from "./repository";

export const index = async (ctx: Context) => {
    const queries = (ctx.request.query as TGetNewsQuerySchema) || {};

    if (queries?.id) {
        const news = await news_repository.find_by_id(queries.id as string);
        return xr(ctx, 200, return_news(news));
    }

    const per_page = Number(queries?.per_page) || 20;
    const page = Number(queries?.page) || 1;

    const newses = (await news_repository.finds(per_page, page)).map((n) => return_news(n));
    return xr(ctx, 200, newses);
};
