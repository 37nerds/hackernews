import type { TStory } from "@/repos/stories";

import { id_schema } from "@/helpers/schema";
import { z } from "zod";

export const fetch_stories_query_schema = z.object({
    id: id_schema.optional(),
    per_page: z.string().optional(),
    page: z.string().optional(),
    filter: z.enum(["home", "newest", "day", "ask", "show", "jobs"]).optional(),
    value: z.string().optional(),
});

export const save_story_body_schema = z.object({
    title: z.string(),
    url: z.string(),
    text: z.string(),
    type: z.enum(["link", "ask", "show", "job"]),
    domain: z.string(),
});

export const update_vote_body_schema = z.object({
    story_id: z.string(),
});

export type TFetchStoriesQuerySchema = z.infer<typeof fetch_stories_query_schema>;
export type TSaveStoryBodySchema = z.infer<typeof save_story_body_schema>;
export type TUpdateVoteBodySchema = z.infer<typeof update_vote_body_schema>;

export const return_stories = (doc: TStory) => {
    return doc;
};
