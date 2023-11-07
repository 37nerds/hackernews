import { registerUserBodySchema } from "./schemas";
import { register } from "./handlers";

import Router from "@koa/router";
import Koa from "koa";
import eh from "@/base/eh";
import validate from "@/middlewares/validate";

export default (app: Koa) => {
    const r = new Router({ prefix: "/v1/users" });

    r.post("/register", validate(null, registerUserBodySchema), eh(register));
    // r.post("/login", validate(null, loginUserBodySchema), eh(login));

    // r.get("/profile", protect(), eh(profile));
    // r.delete("/logout", protect(), eh(logout));
    //
    // r.post("/forgot-password", eh(forgotPassword));
    // r.post("/reset-password", eh(resetPassword));
    // r.post("/change-password", eh(changePassword));
    //
    // r.get("/", validate(getUserQuerySchema, null), eh(index));
    // r.post("/", validate(null, postUserBodySchema), eh(save));
    // r.patch("/", validate(updateQuerySchema, updateBodySchema), eh(update));
    // r.delete("/", validate(updateQuerySchema, null), eh(destroy));
    //

    app.use(r.routes());
    app.use(r.allowedMethods());
};
