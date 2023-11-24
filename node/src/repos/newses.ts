import type { TBaseDoc, TFilter, TSort } from "@/base/repo";
import type { TFaker } from "@/base/types";

import { to_object_id } from "@/base/repo";
import { random, x_seed } from "@/helpers/seeding";

import repo from "@/base/repo";

type TNewsType = "link";

type TInsert = {
    title: string;
    user: string;
    type: TNewsType;
    url: string;
    domain?: string;
};

type TExtra = {
    points: number;
    comments_count: number;
};

type TUpdate = {
    title?: string;
    user?: string;
    type?: TNewsType;
    url?: string;
    domain?: string;
    points?: number;
    comments_count?: number;
};

export type TNews = TBaseDoc & TInsert & TExtra;
export type TNewsInsert = TInsert;
export type TNewsUpdate = TUpdate;

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
    insert: (doc: TNewsInsert) => {
        return repo.insert<TInsert & TExtra, TNews>(NEWSES, {
            ...doc,
            points: 0,
            comments_count: 0,
        });
    },
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
    find: (filter: TFilter) => {
        return repo.find<TNews>(NEWSES, filter);
    },
    find_by_id: (id: string) => {
        return repo.find<TNews>(NEWSES, { _id: to_object_id(id) });
    },
    update: (id: string, doc: TNewsUpdate) => {
        return repo.update<TNewsUpdate, TNews>(NEWSES, id, doc);
    },
    destroy: (id: string) => {
        return repo.destroy(NEWSES, id);
    },
};

export default news_repo;
