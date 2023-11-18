import type { TBaseDoc, TFilter, TSort } from "@/base/repo";

import { to_object_id } from "@/base/repo";

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

const news_repository = {
    insert: (doc: TNewsInsert) => repo.insert<TNewsElseData, TNews>(NEWSES, { ...doc, points: 0, comments_count: 0 }),
    finds: (filter?: object, per_page?: number, page?: number, sort_column?: keyof TNews, sort_order?: TSort) => {
        return repo.finds<TNews>(NEWSES, filter, per_page, page, sort_column, sort_order);
    },
    find: (filter: TFilter) => repo.find<TNews>(NEWSES, filter),
    find_by_id: (id: string) => repo.find<TNews>(NEWSES, { _id: to_object_id(id) }),
    update: (id: string, doc: TNewsUpdate) => repo.update<TNewsUpdate, TNews>(NEWSES, id, doc),
    destroy: (id: string) => repo.destroy(NEWSES, id),
};

export default news_repository;
