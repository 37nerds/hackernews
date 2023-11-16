import type { TNewsInsert, TNews } from "./repository";
import type { Faker } from "@faker-js/faker";

import { NEWSES } from "./repository";
import { random, x_seed } from "@/helpers/seeding";

export default async (faker: Faker, count: number, delete_before: boolean = false) => {
    await x_seed<TNewsInsert, TNews>({
        collection: NEWSES,
        fake_doc: async () => ({
            title: faker.lorem.sentence(),
            points: random.number(0, 100),
            user: faker.internet.userName(),
            time: faker.date.recent().getTime() / 1000,
            time_ago: faker.date.past().toISOString(),
            comments_count: random.number(0, 200),
            type: random.string(["link"]),
            url: faker.internet.url(),
            domain: faker.internet.url(),
        }),
        count,
        delete_before,
    });
};
