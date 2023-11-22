import type { TNews } from "@/repos/newses";

import { id_schema } from "@/helps/schema";
import { z } from "zod";

export const get_newses_query_schema = z.object({
    id: id_schema.optional(),
    per_page: z.string().optional(),
    page: z.string().optional(),
    filter: z.enum(["home", "newest", "day"]).optional(),
    value: z.string().optional(),
});

export const post_newses_body_schema = z.object({
    title: z.string(),
    url: z.string(),
    text: z.string(),
    type: z.enum(["link"]),
    domain: z.string(),
});

export type TGetNewsesQuerySchema = z.infer<typeof get_newses_query_schema>;
export type TPostNewsesBodySchema = z.infer<typeof post_newses_body_schema>;

export const return_news = (doc: TNews) => {
    return doc;
};
