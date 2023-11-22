import type { Context } from "koa";
import type { TUser } from "@/repos/users";

import { load_module_dynamically } from "@/helpers/units";
import { db } from "@/base/single";
import { request_id } from "@/base/middlewares";
import { domains } from "@/config/mics";

import koaLogger from "koa-logger";
import koaJson from "koa-json";
import koaCors from "@koa/cors";
import koaBodyparser from "@koa/bodyparser";
import koaStatic from "koa-static";
import koaMount from "koa-mount";
import KoaRouter from "@koa/router";

import Koa from "koa";

declare module "koa" {
    interface Context {
        user: TUser;
    }
}

const loadMiddlewares = async (app: Koa) => {
    app.proxy = true;

    app.use(request_id());
    app.use(koaBodyparser());
    app.use(
        koaCors({
            credentials: true,
        }),
    );
    app.use(koaLogger());
    app.use(koaJson());
    app.use(koaMount("/public", koaStatic("./public")));

    const router = new KoaRouter();
    router.get("/health", (ctx: Context) => {
        ctx.body = {
            time: new Date().toISOString(),
            message: "ok",
        };
    });
    app.use(router.routes());
    app.use(router.allowedMethods());

    router.get("/", (ctx: Context) => {
        ctx.body = {
            time: new Date().toISOString(),
            message: "ok",
        };
    });
};

const loadDomains = async (app: Koa) => {
    for (const domain of domains) {
        const m = await load_module_dynamically(`../domains/${domain}/index`);
        m.default(app);
    }
};

const app = async () => {
    const a = new Koa();

    await loadMiddlewares(a);
    await db();
    await loadDomains(a);

    a.use((ctx) => {
        ctx.status = 404;
        ctx.body = {
            message: "route not found",
        };
    });
    return a;
};

export default app;
