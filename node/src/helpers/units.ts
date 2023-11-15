import type { Db } from "mongodb";
import type { Context } from "koa";
import type { TStatus } from "@/base/types";

import { MongoClient } from "mongodb";
import { templates } from "@/base/cache";

import fs from "node:fs";
import path from "node:path";
import ejs from "ejs";
import env from "@/configs/env";

export const connect_mongodb = async (): Promise<Db> => {
    const client = new MongoClient(env.MONGO_URI);
    await client.connect();
    return client.db();
};

export const load_templates = (directory_path: string): { [key: string]: string } => {
    const templates: { [key: string]: string } = {};
    fs.readdirSync(directory_path).forEach((file) => {
        const templatePath = path.join(directory_path, file);
        templates[file] = fs.readFileSync(templatePath, "utf-8");
    });
    return templates;
};

export const render = (template: string, params: object) => {
    return ejs.render(template, params);
};

export const reply = (ctx: Context, status: TStatus, body?: object) => {
    ctx.status = status;
    ctx.body = body;
};

export const xr = (ctx: Context, status: TStatus, body?: object) => {
    reply(ctx, status, body);
};

export const load_module_dynamically = async (filepath: string, log_error: boolean = true) => {
    try {
        return await import(filepath);
    } catch (e: any) {
        if (log_error) {
            console.error(`Error importing module for '${filepath}':`, e);
        }
    }
};

export const times = {
    hour: 60 * 60 * 1000,
};

export const is_dev = () => {
    return env.NODE_ENV === "dev";
};

export const get_tmpl = (filename_with_extension: string) => {
    return templates()[filename_with_extension];
};
