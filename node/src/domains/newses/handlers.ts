import type { Context } from "koa";
import type { TNews } from "@/repos/newses";
import type { TSort } from "@/base/repo";
import type { TGetNewsesQuerySchema, TPostNewsesBodySchema, TVoteBodySchema } from "./schemas";

import { to_string_id, to_object_id } from "@/base/repo";
import { reply } from "@/helpers/units";
import { return_news } from "./schemas";

import news_repo from "@/repos/newses";
import user_repo from "@/repos/users";

export const index = async (ctx: Context) => {
    const queries = (ctx.request.query as TGetNewsesQuerySchema) || {};

    if (queries?.id) {
        const news = await news_repo.find_by_id(queries.id as string);
        return reply(ctx, 200, return_news(news));
    }

    const per_page = Number(queries?.per_page) || 20;
    const page = Number(queries?.page) || 1;
    const filter = queries.filter;
    const value = queries.value;

    let query_filter: object = {};
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

    const hidden_news = ctx.user?.hidden_news;

    if (hidden_news) {
        query_filter = {
            ...query_filter,
            _id: { $nin: hidden_news.map((id) => to_object_id(id)) },
        };
    }

    const newses: TNews[] = (
        await news_repo.finds(query_filter, {
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
    const news = await news_repo.insert({ ...body, user: to_string_id(ctx?.user?._id) });
    return reply(ctx, 201, news);
};

export const upvote = async (ctx: Context) => {
    const logged_user = ctx.user;
    const body: TVoteBodySchema = ctx.request.body;

    let news = await news_repo.find_by_id(body.news_id);

    const points = news.points + 1;
    const voted_news = [...(logged_user.voted_news || []), body.news_id];

    news = await news_repo.update(body.news_id, { points });
    await user_repo.update(to_string_id(logged_user._id), { voted_news });

    return reply(ctx, 200, news);
};

export const downvote = async (ctx: Context) => {
    const logged_user = ctx.user;
    const body: TVoteBodySchema = ctx.request.body;

    let news = await news_repo.find_by_id(body.news_id);

    const points = news.points - 1;
    const voted_news = (logged_user.voted_news || []).filter((id) => id !== body.news_id);

    news = await news_repo.update(body.news_id, { points });
    await user_repo.update(to_string_id(logged_user._id), { voted_news });

    return reply(ctx, 200, news);
};
