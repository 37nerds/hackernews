import {
    registerOrLoginUserBodySchema,
    getUserQuerySchema,
    updateLoggedUserProfile,
} from "./schemas";

import { login, logout, profile, register, index, updateProfile } from "./handlers";

import eh from "@/base/eh";
import validate from "@/middlewares/validate";
import protect from "@/middlewares/protect";

import Router from "@koa/router";
import Koa from "koa";

export default (a: Koa) => {
    const r = new Router({ prefix: "/v1/users" });

    r.post("/register", validate(null, registerOrLoginUserBodySchema), eh(register));
    r.post("/login", validate(null, registerOrLoginUserBodySchema), eh(login));
    r.delete("/logout", protect(), eh(logout));

    r.get("/profile", protect(), eh(profile));
    r.patch("/profile", validate(null, updateLoggedUserProfile), protect(), eh(updateProfile));

    r.get("/", validate(getUserQuerySchema, null), eh(index));

    // r.post("/forgot-password", eh(forgotPassword));
    // r.post("/reset-password", eh(resetPassword));
    // r.post("/change-password", eh(changePassword));
    //
    // r.post("/", validate(null, postUserBodySchema), eh(save));
    // r.patch("/", validate(updateQuerySchema, updateBodySchema), eh(update));
    // r.delete("/", validate(updateQuerySchema, null), eh(destroy));

    a.use(r.routes());
    a.use(r.allowedMethods());
};
