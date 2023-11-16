import type { TUserInsert, TUser } from "./repository";
import type { Faker } from "@faker-js/faker";

import { USERS } from "./repository";
import { x_seed } from "@/helpers/seeding";

import crypto from "@/helpers/crypto";

export default async (f: Faker, count: number, delete_before: boolean = false) => {
    await x_seed<TUserInsert, TUser>({
        collection: USERS,
        default_docs: [
            async () => ({
                username: "shihab",
                password: await crypto.hash("password"),
                karma: 1,
            }),
        ],
        fake_doc: async () => ({
            username: f.internet.userName(),
            password: await crypto.hash("password"),
            karma: 1,
        }),
        count,
        delete_before,
    });
};
