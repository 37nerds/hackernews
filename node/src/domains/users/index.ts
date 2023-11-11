import * as s from "./schemas";
import * as h from "./handlers";

import eh from "@/base/eh";
import validate from "@/middlewares/validate";
import protect from "@/middlewares/protect";

import Router from "@koa/router";
import Koa from "koa";

export default (a: Koa) => {
    const r = new Router({ prefix: "/v1/users" });

    r.post("/register", validate(s.registerOrLoginUserBodySchema), eh(h.register));
    r.post("/login", validate(s.registerOrLoginUserBodySchema), eh(h.login));
    r.delete("/logout", protect(), eh(h.logout));

    r.get("/profile", protect(), eh(h.profile));
    r.patch("/profile", validate(s.updateLoggedUserProfile), protect(), eh(h.updateProfile));
    r.patch("/change-password", validate(s.changePasswordBodySchema), protect(), eh(h.changePassword));
    r.post("/forgot-password", validate(s.forgotPasswordBodySchema), eh(h.forgotPassword));
    r.patch("/reset-password", validate(s.resetPasswordBodySchema), eh(h.resetPassword));

    r.get("/", validate(s.getUserQuerySchema), eh(h.index));

    // r.post("/", validate(null, postUserBodySchema), eh(save));
    // r.patch("/", validate(updateQuerySchema, updateBodySchema), eh(update));
    // r.delete("/", validate(updateQuerySchema, null), eh(destroy));

    a.use(r.routes());
    a.use(r.allowedMethods());
};
