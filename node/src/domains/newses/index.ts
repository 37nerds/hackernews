import * as s from "./schemas";
import * as h from "./handlers";

import eh from "@/base/eh";

import Router from "@koa/router";
import Koa from "koa";
import { protect, validate } from "@/base/middlewares";

export default (a: Koa) => {
    const r = new Router({ prefix: "/v1/newses" });

    r.get("/", validate(null, s.get_newses_query_schema), eh(h.index));
    r.post("/", protect(), validate(s.post_newses_body_schema), eh(h.insert));

    a.use(r.routes());
    a.use(r.allowedMethods());
};
