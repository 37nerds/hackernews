import { id_schema } from "@/base/schema";
import { z } from "zod";
import { TNews } from "./repository";

export const get_news_query_schema = z.object({
    id: id_schema.optional(),
});

export type TGetNewsQuerySchema = z.infer<typeof get_news_query_schema>;

export const return_news = (doc: TNews) => {
    return doc;
};
