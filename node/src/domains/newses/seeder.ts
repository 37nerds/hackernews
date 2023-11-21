import type { TNewsInsert, TNews } from "./repository";
import type { Faker } from "@faker-js/faker";

import { NEWSES } from "./repository";
import { random, x_seed } from "@/helpers/seeding";

export default async (faker: Faker, delete_before: boolean = false) => {
    await x_seed<TNewsInsert, TNews>({
        collection: NEWSES,
        fake_doc: async () => ({
            created_at: faker.date.between({
                from: new Date("2022-01-01"),
                to: Date.now(),
            }),
            title: faker.lorem.sentence(),
            points: random.number(0, 100),
            user: faker.internet.userName(),
            comments_count: random.number(0, 200),
            type: random.string(["link"]),
            url: faker.internet.url(),
            domain: faker.internet.url(),
        }),
        count: 2000,
        delete_before,
    });
};
