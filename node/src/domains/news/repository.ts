import type { TBaseDoc, TFilter } from "@/base/repo";

import { to_object_id } from "@/base/repo";

import repo from "@/base/repo";

type TNewsElseData = {
    title: string;
    points: number | null;
    user: string | null;
    time: number;
    time_ago: string;
    comments_count: number;
    type: string;
    url: string;
    domain?: string;
};

export type TNews = TBaseDoc & TNewsElseData;
export type TNewsInsert = TNewsElseData;
export type TNewsUpdate = TNewsElseData;

export const NEWS = "news";

const news_repository = {
    insert: (doc: TNewsInsert) => repo.insert<TNewsInsert, TNews>(NEWS, doc),
    finds: (): Promise<TNews[]> => repo.finds<TNews>(NEWS),
    find: (filter: TFilter) => repo.find<TNews>(NEWS, filter),
    find_by_id: (id: string) => repo.find<TNews>(NEWS, { _id: to_object_id(id) }),
    update: (id: string, doc: TNewsUpdate) => repo.update<TNewsUpdate, TNews>(NEWS, id, doc),
    destroy: (id: string) => repo.destroy(NEWS, id),
};

export default news_repository;
