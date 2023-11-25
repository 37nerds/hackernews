import type { TBaseDoc, TFilter, TSort } from "@/base/repo";
import type { TFaker } from "@/base/types";

import { to_object_id } from "@/base/repo";
import { random, x_seed } from "@/helpers/seeding";

import repo from "@/base/repo";

type TStoryType = "link" | "ask" | "show" | "job";

type TInsert = {
    title: string;
    user: string;
    type: TStoryType;
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
    type?: TStoryType;
    url?: string;
    domain?: string;
    points?: number;
    comments_count?: number;
};

export type TStory = TBaseDoc & TInsert & TExtra;
export type TStoryInsert = TInsert;
export type TStoryUpdate = TUpdate;

export const STORIES = "stories";

export const seeder = async (faker: TFaker, delete_before: boolean = false) => {
    await x_seed<TStoryInsert, TStory>({
        collection: STORIES,
        fake_doc: async () => ({
            created_at: faker.date.between({
                from: new Date("2022-01-01"),
                to: Date.now(),
            }),
            title: faker.lorem.sentence(),
            points: random.number(0, 100),
            user: faker.internet.userName(),
            comments_count: random.number(0, 200),
            type: random.string(["link", "ask", "show", "job"]),
            url: faker.internet.url(),
            domain: faker.internet.url(),
        }),
        count: 9000,
        delete_before,
    });
};

const stories = {
    insert: (doc: TStoryInsert) => {
        return repo.insert<TInsert & TExtra, TStory>(STORIES, {
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
            sort_column?: keyof TStory;
            sort_order?: TSort;
        },
    ) => {
        return repo.finds<TStory>(
            STORIES,
            filter,
            options?.per_page,
            options?.page,
            options?.sort_column,
            options?.sort_order,
        );
    },
    find: (filter: TFilter) => {
        return repo.find<TStory>(STORIES, filter);
    },
    find_by_id: (id: string) => {
        return repo.find<TStory>(STORIES, { _id: to_object_id(id) });
    },
    update: (id: string, doc: TStoryUpdate) => {
        return repo.update<TStoryUpdate, TStory>(STORIES, id, doc);
    },
    destroy: (id: string) => {
        return repo.destroy(STORIES, id);
    },
};

export default stories;
