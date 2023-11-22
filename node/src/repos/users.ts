import type { TBaseDoc, TFilter } from "@/base/repo";
import type { TFaker } from "@/base/types";

import { x_seed } from "@/helpers/seeding";
import { BadRequestError } from "@/helpers/errors";
import { to_object_id } from "@/base/repo";

import repo from "@/base/repo";
import crypto from "@/helpers/crypto";

type TUserExtra = {
    email?: string;
    about?: string;
    showdead?: boolean;
    noprocrast?: boolean;
    maxvisit?: number;
    minaway?: number;
    delay?: number;
    karma?: number;
    hidden_news?: string[];
};

export type TUser = TBaseDoc & TUserInsert & TUserExtra;

export type TUserInsert = {
    username: string;
    password: string;
    karma: number;
};

export type TUserUpdate = { username?: string; password?: string } & TUserExtra;

export const USERS = "users";

export const seeder = async (f: TFaker, delete_before: boolean = false) => {
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
        count: 20,
        delete_before,
    });
};

const user_repo = {
    insert: async (doc: { username: string; password: string }): Promise<TUser> => {
        const { username } = doc;
        let user: TUser | null;
        try {
            user = await user_repo.find({ username });
        } catch (e: any) {
            user = null;
        }
        if (user) {
            throw new BadRequestError("user already exits", { username: "username already exits" });
        }
        doc.password = await crypto.hash(doc.password);
        return await repo.insert<TUserInsert, TUser>(USERS, { ...doc, karma: 1 });
    },
    finds: async (): Promise<TUser[]> => {
        return await repo.finds<TUser>(USERS);
    },
    find: async (filter: TFilter) => {
        return await repo.find<TUser>(USERS, filter);
    },
    find_by_id: async (id: string): Promise<TUser> => {
        return await repo.find<TUser>(USERS, { _id: to_object_id(id) });
    },
    find_by_username: async (username: string): Promise<TUser> => {
        return await repo.find<TUser>(USERS, { username });
    },
    find_by_email: async (email: string): Promise<TUser> => {
        return await repo.find<TUser>(USERS, { email });
    },
    update: async (id: string, doc: TUserUpdate): Promise<TUser> => {
        if (doc.password) {
            doc.password = await crypto.hash(doc.password);
        }
        return await repo.update<TUserUpdate, TUser>(USERS, id, doc);
    },
    destroy: async (id: string): Promise<void> => {
        await repo.destroy(USERS, id);
    },
};

export default user_repo;
