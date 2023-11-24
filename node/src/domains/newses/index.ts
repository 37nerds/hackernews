import * as s from "./schemas";
import * as h from "./handlers";

import { load_user, protect, validate } from "@/base/middlewares";

import eh from "@/base/eh";

import Router from "@koa/router";
import Koa from "koa";

export default (a: Koa) => {
    const r = new Router({ prefix: "/v1/newses" });

    r.patch("/upvote", protect(), validate(s.vote_body_schema), eh(h.upvote));
    r.patch("/downvote", protect(), validate(s.vote_body_schema), eh(h.downvote));
    r.get("/", load_user(), validate(null, s.get_newses_query_schema), eh(h.index));
    r.post("/", protect(), validate(s.post_newses_body_schema), eh(h.insert));

    a.use(r.routes());
    a.use(r.allowedMethods());
};
