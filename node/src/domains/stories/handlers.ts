import type { Context } from "koa";
import type { TStory } from "@/repos/stories";
import type { TSort } from "@/base/repo";
import type { TFetchStoriesQuerySchema, TSaveStoryBodySchema, TUpdateVoteBodySchema } from "./schemas";

import { to_string_id, to_object_id, comparison } from "@/base/repo";
import { reply } from "@/helpers/units";
import { return_stories } from "./schemas";

import story_repo from "@/repos/stories";
import user_repo from "@/repos/users";

export const index = async (ctx: Context) => {
    const queries = (ctx.request.query as TFetchStoriesQuerySchema) || {};

    if (queries?.id) {
        const story = await story_repo.find_by_id(queries.id as string);
        return reply(ctx, 200, return_stories(story));
    }

    const per_page = Number(queries?.per_page) || 20;
    const page = Number(queries?.page) || 1;
    const filter = queries.filter;
    const value = queries.value;

    let query_filter: object = {};
    let sort_column: keyof TStory = "created_at";
    let sort_order: TSort = "desc";

    if (filter === "home") {
        query_filter = { ...query_filter, type: { [comparison.not_equal]: "job" } };
        sort_column = "created_at";
        sort_order = "asc";
    } else if (filter === "newest") {
        query_filter = { ...query_filter, type: { [comparison.not_equal]: "job" } };
    } else if (filter === "day") {
        query_filter = {
            ...query_filter,
            type: { [comparison.not_equal]: "job" },
            created_at: {
                [comparison.greater]: new Date(new Date(value || "").setHours(0, 0, 0, 0)),
                [comparison.less]: new Date(new Date(value || "").setHours(23, 59, 59, 999)),
            },
        };
    } else if (filter === "ask") {
        query_filter = { ...query_filter, type: { [comparison.equal]: "ask" } };
    } else if (filter === "show") {
        query_filter = { ...query_filter, type: { [comparison.equal]: "show" } };
    } else if (filter === "jobs") {
        query_filter = { ...query_filter, type: { [comparison.equal]: "job" } };
    }

    const hidden_story = ctx.user?.hidden_story || [];

    if (hidden_story) {
        query_filter = {
            ...query_filter,
            _id: { $nin: hidden_story.map((id) => to_object_id(id)) },
        };
    }

    const stories: TStory[] = (
        await story_repo.finds(query_filter, {
            per_page,
            page,
            sort_column,
            sort_order,
        })
    ).map((n) => return_stories(n));

    return reply(ctx, 200, stories);
};

export const insert = async (ctx: Context) => {
    const body = ctx.request.body as TSaveStoryBodySchema;
    const story = await story_repo.insert({ ...body, user: to_string_id(ctx?.user?._id) });
    return reply(ctx, 201, story);
};

export const upvote = async (ctx: Context) => {
    const logged_user = ctx.user;
    const body: TUpdateVoteBodySchema = ctx.request.body;

    let story = await story_repo.find_by_id(body.story_id);

    const points = story.points + 1;
    const voted_story = [...(logged_user.voted_story || []), body.story_id];

    story = await story_repo.update(body.story_id, { points });
    await user_repo.update(to_string_id(logged_user._id), { voted_story });

    return reply(ctx, 200, story);
};

export const downvote = async (ctx: Context) => {
    const logged_user = ctx.user;
    const body: TUpdateVoteBodySchema = ctx.request.body;

    let story = await story_repo.find_by_id(body.story_id);

    const points = story.points - 1;
    const voted_story = (logged_user.voted_story || []).filter((id) => id !== body.story_id);

    story = await story_repo.update(body.story_id, { points });
    await user_repo.update(to_string_id(logged_user._id), { voted_story });

    return reply(ctx, 200, story);
};
