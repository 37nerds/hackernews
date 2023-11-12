import type { TUserInsert, TUser } from "./repository";
import type { Faker } from "@faker-js/faker";

import { USERS } from "./repository";
import { db } from "@/base/cache";

import repository from "@/base/repository";
import crypto from "@/helpers/crypto";
import log from "@/helpers/log";

export default async (f: Faker, count: number, deleteBefore: boolean = false) => {
    const c = (await db()).collection(USERS);
    if (deleteBefore) {
        log.info(`removing the ${USERS} collection...`);
        await c.deleteMany();
        log.info(`done`);
    }

    log.info("seeding the users with fake data...");
    if (deleteBefore) {
        await repository.insert<TUserInsert, TUser>(USERS, {
            username: "shihab",
            password: await crypto.hash("password"),
        });
    }
    for (let i = 0; i < count - 1; i++) {
        await repository.insert<TUserInsert, TUser>(USERS, {
            username: f.internet.userName(),
            password: await crypto.hash("password"),
        });
    }
    log.info("done");
};
