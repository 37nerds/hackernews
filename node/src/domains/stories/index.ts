import * as s from "./schemas";
import * as h from "./handlers";

import { load_user, protect, validate } from "@/base/middlewares";

import eh from "@/base/eh";

import Router from "@koa/router";
import Koa from "koa";

export default (a: Koa) => {
    const r = new Router({ prefix: "/v1/stories" });

    r.patch("/upvote", protect(), validate(s.update_vote_body_schema), eh(h.upvote));
    r.patch("/downvote", protect(), validate(s.update_vote_body_schema), eh(h.downvote));
    r.get("/", load_user(), validate(null, s.fetch_stories_query_schema), eh(h.index));
    r.post("/", protect(), validate(s.save_story_body_schema), eh(h.insert));

    a.use(r.routes());
    a.use(r.allowedMethods());
};
