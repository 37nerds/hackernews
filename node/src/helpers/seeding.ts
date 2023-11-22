import { db } from "@/base/single";

import log from "./log";
import repo from "@/base/repo";

export const x_seed = async <TInsert, TModel>(options: {
    collection: string;
    fake_doc: () => Promise<TInsert>;
    count?: number;
    delete_before?: boolean;
    default_docs?: (() => Promise<TInsert>)[];
}) => {
    const collection = options.collection;
    const fake_doc = options.fake_doc;
    const count = options.count || 0;
    const delete_before = options.delete_before || false;
    const default_docs = options.default_docs || [];

    const c = (await db()).collection(collection);
    if (delete_before || false) {
        log.info(`removing the ${collection} collection...`);
        await c.deleteMany();
        log.info(`done`);
    }

    log.info(`seeding the ${collection} with fake data...`);
    for (const doc of default_docs) {
        await repo.insert<TInsert, TModel>(collection, await doc());
    }
    for (let i = 1; i <= count; i++) {
        log.info(`seeding the ${collection} with fake data: ${i}`);
        await repo.insert<TInsert, TModel>(collection, await fake_doc());
    }
    log.info("done");
};

export const random = {
    number: (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1)) + min,
    string: <T>(options: T[]): T => options[Math.floor(Math.random() * options.length)],
};
