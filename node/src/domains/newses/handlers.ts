import type { Context } from "koa";
import type { TGetNewsesQuerySchema, TPostNewsesBodySchema } from "./schemas";
import type { TNews } from "./repository";

import { return_news } from "./schemas";
import { xr } from "@/helpers/units";
import { TSort, to_string_id } from "@/base/repo";

import news_repository from "./repository";

export const index = async (ctx: Context) => {
    const queries = (ctx.request.query as TGetNewsesQuerySchema) || {};

    if (queries?.id) {
        const news = await news_repository.find_by_id(queries.id as string);
        return xr(ctx, 200, return_news(news));
    }

    const per_page = Number(queries?.per_page) || 20;
    const page = Number(queries?.page) || 1;
    const sort = queries.sort;
    const filter = queries.filter;
    const filter_value = queries.filter_value;

    let query_filter = {};
    let sort_column: keyof TNews = "created_at";
    let sort_order: TSort = "asc";

    if (filter === "day") {
        const selected_date = new Date(filter_value || "");
        const day_start = new Date(selected_date.setHours(0, 0, 0, 0));
        const day_end = new Date(selected_date.setHours(23, 59, 59, 999));
        query_filter = {
            created_at: { $gt: day_start, $lt: day_end },
        };
        sort_column = "created_at";
        sort_order = "desc";
    } else if (sort === "home") {
        sort_order = "asc";
    } else if (sort === "newest") {
        sort_order = "desc";
    }

    const newses: TNews[] = (
        await news_repository.finds(query_filter, {
            per_page,
            page,
            sort_column,
            sort_order,
        })
    ).map((n) => return_news(n));

    return xr(ctx, 200, newses);
};

export const insert = async (ctx: Context) => {
    const body = ctx.request.body as TPostNewsesBodySchema;

    console.log(ctx.user);
    const news = await news_repository.insert({ ...body, user: to_string_id(ctx?.user?._id) });
    return xr(ctx, 201, news);
};
