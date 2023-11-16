import type { TBaseDoc, TFilter } from "@/base/repo";

import { USERS_CREATED, USERS_DELETED, USERS_FIND, USERS_FINDS, USERS_UPDATED } from "./events";
import { BadRequestError } from "@/helpers/errors";
import { emitter } from "@/base/cache";

import repo, { to_object_id } from "@/base/repo";
import crypto from "@/helpers/crypto";

type TUserElseData = {
    email?: string;
    about?: string;
    showdead?: boolean;
    noprocrast?: boolean;
    maxvisit?: number;
    minaway?: number;
    delay?: number;
    karma?: number;
};

export type TUserInsert = {
    username: string;
    password: string;
    karma: number;
};

export type TUserUpdate = { username?: string; password?: string } & TUserElseData;

export type TUser = TBaseDoc & TUserInsert & TUserElseData;

export const USERS = "users";

const user_repository = {
    insert: async (doc: { username: string; password: string }): Promise<TUser> => {
        const { username } = doc;
        let user: TUser | null;
        try {
            user = await user_repository.find({ username });
        } catch (e: any) {
            user = null;
        }
        if (user) {
            throw new BadRequestError("user already exits", { username: "username already exits" });
        }
        doc.password = await crypto.hash(doc.password);
        user = await repo.insert<TUserInsert, TUser>(USERS, { ...doc, karma: 1 });
        emitter().emit(USERS_CREATED, user);
        return user;
    },
    finds: async (): Promise<TUser[]> => {
        const users = await repo.finds<TUser>(USERS);
        emitter().emit(USERS_FINDS, users);
        return users;
    },
    find: async (filter: TFilter) => {
        const user = await repo.find<TUser>(USERS, filter);
        emitter().emit(USERS_FIND, user);
        return user;
    },
    find_by_id: async (id: string): Promise<TUser> => {
        const user = await repo.find<TUser>(USERS, { _id: to_object_id(id) });
        emitter().emit(USERS_FIND, user);
        return user;
    },
    find_by_username: async (username: string): Promise<TUser> => {
        const user = await repo.find<TUser>(USERS, { username });
        emitter().emit(USERS_FIND, user);
        return user;
    },
    find_by_email: async (email: string): Promise<TUser> => {
        const user = await repo.find<TUser>(USERS, { email });
        emitter().emit(USERS_FIND, user);
        return user;
    },
    update: async (id: string, doc: TUserUpdate): Promise<TUser> => {
        if (doc.password) {
            doc.password = await crypto.hash(doc.password);
        }
        const user = await repo.update<TUserUpdate, TUser>(USERS, id, doc);
        emitter().emit(USERS_UPDATED, user);
        return user;
    },
    destroy: async (id: string): Promise<void> => {
        await repo.destroy(USERS, id);
        emitter().emit(USERS_DELETED, id);
    },
};

export default user_repository;
