import type { Context } from "koa";
import type { TGetNewsesQuerySchema, TPostNewsesBodySchema } from "./schemas";
import type { TNews } from "./repository";

import { return_news } from "./schemas";
import { xr } from "@/helpers/units";

import news_repository from "./repository";
import { to_string_id } from "@/base/repo";

export const index = async (ctx: Context) => {
    const queries = (ctx.request.query as TGetNewsesQuerySchema) || {};

    if (queries?.id) {
        const news = await news_repository.find_by_id(queries.id as string);
        return xr(ctx, 200, return_news(news));
    }

    const per_page = Number(queries?.per_page) || 20;
    const page = Number(queries?.page) || 1;
    const sort = queries.sort;
    let newses: TNews[] = [];

    if (sort === "home") {
        newses = await news_repository.finds(per_page, page, "created_at", "asc");
    }

    if (sort === "newest") {
        newses = await news_repository.finds(per_page, page, "created_at", "desc");
    }

    return xr(
        ctx,
        200,
        newses.map((n) => return_news(n)),
    );
};

export const insert = async (ctx: Context) => {
    const body = ctx.request.body as TPostNewsesBodySchema;

    console.log(ctx.user);
    const news = await news_repository.insert({ ...body, user: to_string_id(ctx?.user?._id) });
    return xr(ctx, 201, news);
};
