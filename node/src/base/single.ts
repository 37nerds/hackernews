import type { Db } from "mongodb";

import { EventEmitter } from "node:events";
import { load_templates } from "@/helps/units";
import { connect_mongodb } from "@/helps/units";

import path from "node:path";
import log from "@/helps/log";

let _templates: { [key: string]: string };
let _db: Db;
let _emitter: EventEmitter;

export const db = async () => {
    if (!_db) {
        _db = await connect_mongodb();
        log.boot("connected successfully to mongodb");
    }
    return _db;
};

export const emitter = () => {
    if (!_emitter) {
        _emitter = new EventEmitter();
        log.boot("emitter created");
    }
    return _emitter;
};

export const templates = () => {
    if (!_templates) {
        _templates = load_templates(path.join(__dirname, "..", "..", "tmpl"));
        log.boot("templates loaded");
    }
    return _templates;
};
