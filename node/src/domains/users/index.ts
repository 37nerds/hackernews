import * as s from "./schemas";
import * as h from "./handlers";

import eh from "@/base/eh";
import validate from "@/middlewares/validate";
import protect from "@/middlewares/protect";

import Router from "@koa/router";
import Koa from "koa";

export default (a: Koa) => {
    const r = new Router({ prefix: "/v1/users" });

    r.post("/register", validate(s.register_or_login_user_body_schema), eh(h.register));
    r.post("/login", validate(s.register_or_login_user_body_schema), eh(h.login));
    r.delete("/logout", protect(), eh(h.logout));

    r.get("/profile", protect(), eh(h.profile));
    r.patch("/profile", validate(s.update_profile_body_schema), protect(), eh(h.updateProfile));
    r.patch("/change-password", validate(s.change_password_body_schema), protect(), eh(h.changePassword));
    r.post("/forgot-password", validate(s.forgot_password_body_schema), eh(h.forgotPassword));
    r.patch("/reset-password", validate(s.reset_password_body_schema), eh(h.reset_password));

    r.get("/", validate(s.get_user_query_schema), eh(h.index));

    // r.post("/", validate(null, postUserBodySchema), eh(save));
    // r.patch("/", validate(updateQuerySchema, updateBodySchema), eh(update));
    // r.delete("/", validate(updateQuerySchema, null), eh(destroy));

    a.use(r.routes());
    a.use(r.allowedMethods());
};
