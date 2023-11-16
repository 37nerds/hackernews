import { id_schema } from "@/base/schema";
import { z } from "zod";
import { TNews } from "./repository";

export const get_newses_query_schema = z.object({
    id: id_schema.optional(),
    per_page: z.string().optional(),
    page: z.string().optional(),
    sort: z.enum(["home", "newest"]).default("home"),
});

export type TGetNewsesQuerySchema = z.infer<typeof get_newses_query_schema>;

export const return_news = (doc: TNews) => {
    return doc;
};
