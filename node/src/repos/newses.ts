import type { TBaseDoc, TFilter, TSort } from "@/base/repo";
import type { TFaker } from "@/base/types";

import { to_object_id } from "@/base/repo";
import { random, x_seed } from "@/helpers/seeding";

import repo from "@/base/repo";

type TNewsType = "link";

type TNewsElseData = {
    title: string;
    points: number | null;
    user: string | null;
    comments_count: number;
    type: TNewsType;
    url: string;
    domain?: string;
};

export type TNews = TBaseDoc & TNewsElseData;

export type TNewsInsert = {
    title: string;
    user: string;
    type: TNewsType;
    url: string;
    domain?: string;
};

export type TNewsUpdate = TNewsElseData;

export const NEWSES = "newses";

export const seeder = async (faker: TFaker, delete_before: boolean = false) => {
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

const news_repo = {
    insert: (doc: TNewsInsert) => repo.insert<TNewsElseData, TNews>(NEWSES, { ...doc, points: 0, comments_count: 0 }),
    finds: (
        filter?: object,
        options?: {
            per_page?: number;
            page?: number;
            sort_column?: keyof TNews;
            sort_order?: TSort;
        },
    ) => {
        return repo.finds<TNews>(
            NEWSES,
            filter,
            options?.per_page,
            options?.page,
            options?.sort_column,
            options?.sort_order,
        );
    },
    find: (filter: TFilter) => repo.find<TNews>(NEWSES, filter),
    find_by_id: (id: string) => repo.find<TNews>(NEWSES, { _id: to_object_id(id) }),
    update: (id: string, doc: TNewsUpdate) => repo.update<TNewsUpdate, TNews>(NEWSES, id, doc),
    destroy: (id: string) => repo.destroy(NEWSES, id),
};

export default news_repo;
