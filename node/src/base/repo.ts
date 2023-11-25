import type { Filter, Document, WithId, OptionalId } from "mongodb";

import { DatabaseError, NotFoundError, ProcessingError } from "@/helpers/errors";
import { ObjectId } from "mongodb";
import { db } from "@/base/single";

export type TBaseDoc = {
    _id: ObjectId;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date | null;
};

export type TFilter = Filter<Document>;

export type TSort = "desc" | "asc";

export const to_object_id = (_id: string): ObjectId => {
    try {
        return new ObjectId(_id);
    } catch (e: any) {
        throw new ProcessingError(e.message);
    }
};

export const to_string_id = (id?: ObjectId): string => {
    try {
        return id?.toString() || "";
    } catch (e: any) {
        throw new ProcessingError(e.message);
    }
};

const get_collection = async (collection: string) => {
    return (await db()).collection(collection);
};

const repo = {
    insert: async <T, T2>(collection: string, doc: T): Promise<T2> => {
        const c = await get_collection(collection);
        const doc2: any = { ...doc };
        if (!doc2?.created_at) {
            doc2.created_at = new Date();
        }
        if (!doc2?.deleted_at) {
            doc2.deleted_at = null;
        }
        const r = await c.insertOne(doc2 as OptionalId<T>);
        const saved_doc = await c.findOne({
            _id: r.insertedId,
        });
        if (!saved_doc) {
            throw new NotFoundError(`item not found in '${collection}' collection`);
        }
        return saved_doc as T2;
    },
    finds: async <T>(
        collection: string,
        filter: object = {},
        per_page: number = 20,
        page: number = 1,
        sort_column: string = "created_at",
        sort_order: TSort = "desc",
        shallow: boolean = false,
    ): Promise<T[]> => {
        const c = await get_collection(collection);
        if (shallow) {
            filter = {
                ...filter,
                ...{
                    deleted_at: { $eq: null },
                },
            };
        }
        const items = await c
            .find(filter)
            .sort({ [sort_column]: sort_order === "asc" ? 1 : -1 })
            .limit(per_page)
            .skip((page - 1) * per_page)
            .toArray();
        return items as T[];
    },
    find: async <T>(collection: string, filter_or_id: string | TFilter, shallow: boolean = false): Promise<T> => {
        const c = await get_collection(collection);
        let item: WithId<Document> | null;
        if (typeof filter_or_id === "string") {
            item = await c.findOne({ _id: to_object_id(filter_or_id) });
        } else {
            item = await c.findOne(filter_or_id);
        }
        if (!item) {
            throw new NotFoundError(`item not found in '${collection}' collection`);
        }
        if (shallow) {
            if (item.deleted_at !== null) {
                throw new NotFoundError(`item not found in '${collection}' collection`);
            }
        }
        return item as T;
    },
    update: async <T, T2>(collection: string, id: string, doc: T): Promise<T2> => {
        const c = await get_collection(collection);
        doc = { ...doc, updated_at: new Date() };
        const r = await c.updateOne({ _id: to_object_id(id) }, { $set: doc });
        if (r.matchedCount === 0) {
            throw new DatabaseError(`failed to update item in '${collection}' collection`);
        }
        return repo.find<T2>(collection, id);
    },
    destroy: async (collection: string, id: string, shallow: boolean = false): Promise<void> => {
        const c = await get_collection(collection);
        const o_id = to_object_id(id);
        const item = await c.findOne({ _id: o_id });
        if (!item) {
            throw new NotFoundError(`item not found in '${collection}' collection`);
        }
        if (shallow) {
            if (item.deleted_at !== null) {
                throw new NotFoundError(`item not found in '${collection}' collection`);
            }
            const r = await c.updateOne({ _id: o_id }, { $set: { deleted_at: new Date() } });
            if (r.matchedCount === 0) {
                throw new DatabaseError(`failed to update item in '${collection}' collection`);
            }
            return;
        }
        const r = await c.deleteOne({ _id: o_id });
        if (r.deletedCount !== 1) {
            throw new DatabaseError(`failed to delete item in '${collection}' collection`);
        }
    },
};

export default repo;

export const comparison = {
    equal: "$eq",
    not_equal: "$ne",
    greater: "$gt",
    greater_or_equal: "$gte",
    less: "$lt",
    less_or_equal: "$lte",
    in_array: "$in",
    not_in_array: "$nin",
};
