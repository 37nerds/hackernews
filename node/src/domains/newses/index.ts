import * as s from "./schemas";
import * as h from "./handlers";

import eh from "@/base/eh";
import validate from "@/middlewares/validate";

import Router from "@koa/router";
import Koa from "koa";

export default (a: Koa) => {
    const r = new Router({ prefix: "/v1/newses" });

    r.get("/", validate(null, s.get_newses_query_schema), eh(h.index));

    a.use(r.routes());
    a.use(r.allowedMethods());
};
