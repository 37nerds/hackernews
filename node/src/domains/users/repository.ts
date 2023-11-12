import type { Filter, Document } from "mongodb";
import type { TDocBase } from "@/base/repository";

import { USERS_CREATED, USERS_DELETED, USERS_FIND, USERS_FINDS, USERS_UPDATED } from "./events";
import { BadRequestError } from "@/helpers/errors";
import { emitter } from "@/base/cache";

import repository from "@/base/repository";
import crypto from "@/helpers/crypto";

type TUserElseData = {
    email?: string;
    about?: string;
    showdead?: boolean;
    noprocrast?: boolean;
    maxvisit?: number;
    minaway?: number;
    delay?: number;
};

export type TUserInsert = {
    username: string;
    password: string;
};

export type TUserUpdate = { username?: string; password?: string } & TUserElseData;

export type TUser = TDocBase & TUserInsert & TUserElseData;

export const USERS = "users";

const user_repository = {
    insert: async (doc: TUserInsert): Promise<TUser> => {
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
        user = await repository.insert<TUserInsert, TUser>(USERS, doc);
        emitter().emit(USERS_CREATED, user);
        return user;
    },
    finds: async (): Promise<TUser[]> => {
        const users = await repository.finds<TUser>(USERS);
        emitter().emit(USERS_FINDS, users);
        return users;
    },
    find: async (filter: Filter<Document>) => {
        const user = await repository.find<TUser>(USERS, filter);
        emitter().emit(USERS_FIND, user);
        return user;
    },
    find_by_id: async (user_id: string): Promise<TUser> => {
        const user = await repository.find<TUser>(USERS, user_id);
        emitter().emit(USERS_FIND, user);
        return user;
    },
    find_by_username: async (username: string): Promise<TUser> => {
        const user = await repository.find<TUser>(USERS, { username });
        emitter().emit(USERS_FIND, user);
        return user;
    },
    find_by_email: async (email: string): Promise<TUser> => {
        const user = await repository.find<TUser>(USERS, { email });
        emitter().emit(USERS_FIND, user);
        return user;
    },
    update: async (user_id: string, doc: TUserUpdate): Promise<TUser> => {
        if (doc.password) {
            doc.password = await crypto.hash(doc.password);
        }
        const user = await repository.update<TUserUpdate, TUser>(USERS, user_id, doc);
        emitter().emit(USERS_UPDATED, user);
        return user;
    },
    destroy: async (user_id: string): Promise<void> => {
        await repository.destroy(USERS, user_id);
        emitter().emit(USERS_DELETED, user_id);
    },
};

export default user_repository;
