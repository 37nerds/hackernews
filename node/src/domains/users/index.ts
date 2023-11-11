import {
    registerOrLoginUserBodySchema,
    getUserQuerySchema,
    updateLoggedUserProfile,
    changePasswordBodySchema,
    forgotPasswordBodySchema,
} from "./schemas";

import { login, logout, profile, register, index, updateProfile, changePassword, forgotPassword } from "./handlers";

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
    r.patch("/change-password", validate(null, changePasswordBodySchema), protect(), eh(changePassword));
    r.post("/forgot-password", validate(null, forgotPasswordBodySchema), eh(forgotPassword));

    r.get("/", validate(getUserQuerySchema, null), eh(index));

    // r.post("/reset-password", eh(resetPassword));
    //
    // r.post("/", validate(null, postUserBodySchema), eh(save));
    // r.patch("/", validate(updateQuerySchema, updateBodySchema), eh(update));
    // r.delete("/", validate(updateQuerySchema, null), eh(destroy));

    a.use(r.routes());
    a.use(r.allowedMethods());
};
