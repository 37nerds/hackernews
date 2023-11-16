import * as s from "./schemas";
import * as h from "./handlers";

import eh from "@/base/eh";
import { protect, validate } from "@/base/middlewares";

import Router from "@koa/router";
import Koa from "koa";

export default (a: Koa) => {
    const r = new Router({ prefix: "/v1/users" });

    r.post("/register", validate(s.register_or_login_user_body_schema), eh(h.register));
    r.post("/login", validate(s.register_or_login_user_body_schema), eh(h.login));
    r.delete("/logout", protect(), eh(h.logout));

    r.get("/profile", protect(), eh(h.profile));
    r.patch("/profile", validate(s.update_profile_body_schema), protect(), eh(h.update_profile));
    r.patch("/change-password", validate(s.change_password_body_schema), protect(), eh(h.change_password));
    r.post("/forgot-password", validate(s.forgot_password_body_schema), eh(h.forgot_password));
    r.patch("/reset-password", validate(s.reset_password_body_schema), eh(h.reset_password));

    r.get("/", validate(null, s.get_user_query_schema), eh(h.index));

    a.use(r.routes());
    a.use(r.allowedMethods());
};
