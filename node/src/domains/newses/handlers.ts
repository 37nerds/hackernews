import type { Context } from "koa";
import type { TGetNewsesQuerySchema, TPostNewsesBodySchema } from "./schemas";
import type { TNews } from "./repository";

import { return_news } from "./schemas";
import { TSort, to_string_id } from "@/base/repo";

import news_repository from "./repository";
import { reply } from "@/helpers/units";

export const index = async (ctx: Context) => {
    const queries = (ctx.request.query as TGetNewsesQuerySchema) || {};

    if (queries?.id) {
        const news = await news_repository.find_by_id(queries.id as string);
        return reply(ctx, 200, return_news(news));
    }

    const per_page = Number(queries?.per_page) || 20;
    const page = Number(queries?.page) || 1;
    const filter = queries.filter;
    const value = queries.value;

    let query_filter = {};
    let sort_column: keyof TNews = "created_at";
    let sort_order: TSort = "asc";

    if (filter === "home") {
        sort_column = "created_at";
        sort_order = "asc";
    } else if (filter === "newest") {
        sort_column = "created_at";
        sort_order = "desc";
    } else if (filter === "day") {
        const selected_date = new Date(value || "");
        const day_start = new Date(selected_date.setHours(0, 0, 0, 0));
        const day_end = new Date(selected_date.setHours(23, 59, 59, 999));
        query_filter = {
            created_at: { $gt: day_start, $lt: day_end },
        };
        sort_column = "created_at";
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

    return reply(ctx, 200, newses);
};

export const insert = async (ctx: Context) => {
    const body = ctx.request.body as TPostNewsesBodySchema;
    const news = await news_repository.insert({ ...body, user: to_string_id(ctx?.user?._id) });
    return reply(ctx, 201, news);
};
