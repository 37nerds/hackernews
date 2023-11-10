import { Filter, Document } from "mongodb";
import { BadRequestError } from "@/helpers/errors";
import { USERS_CREATED, USERS_FIND, USERS_FINDS, USERS_UPDATED } from "./events";
import { emitter } from "@/base/cache";

import repository, { TDocBase } from "@/base/repository";
import crypto from "@/helpers/crypto";

export type TInsertUser = {
    username: string;
    password: string;
};

type TUserElseData = {
    email?: string;
    about?: string;
    showdead?: boolean;
    noprocrast?: boolean;
    maxvisit?: number;
    minaway?: number;
    delay?: number;
};

export type TUser = TDocBase & TInsertUser & TUserElseData;
export type TUpdateUser = { username?: string; password?: string } & TUserElseData;

export const USERS = "users";

export const find = async (filter: Filter<Document>) => {
    const user = await repository.find<TUser>(USERS, filter);
    emitter().emit(USERS_FIND, user);
    return user;
};

export const findById = async (userId: string): Promise<TUser> => {
    const user = await repository.find<TUser>(USERS, userId);
    emitter().emit(USERS_FIND, user);
    return user;
};

export const findByUsername = async (username: string): Promise<TUser> => {
    const user = await repository.find<TUser>(USERS, { username });
    emitter().emit(USERS_FIND, user);
    return user;
};

export const insert = async (doc: TInsertUser): Promise<TUser> => {
    const { username } = doc;
    let user: TUser | null;
    try {
        user = await find({ username });
    } catch (e: any) {
        user = null;
    }
    if (user) {
        throw new BadRequestError("user already exits", { username: "username already exits" });
    }

    doc.password = await crypto.hash(doc.password);
    user = await repository.insert<TInsertUser, TUser>(USERS, doc);

    emitter().emit(USERS_CREATED, user);

    return user;
};

export const finds = async (): Promise<TUser[]> => {
    const users = await repository.finds<TUser>(USERS);
    emitter().emit(USERS_FINDS, users);
    return users;
};

export const update = async (userId: string, doc: TUpdateUser): Promise<TUser> => {
    if (doc.password) {
        doc.password = await crypto.hash(doc.password);
    }
    const user = await repository.update<TUpdateUser, TUser>(USERS, userId, doc);
    emitter().emit(USERS_UPDATED, user);
    return user;
};

// const destroy = async (userId: string): Promise<void> => {
//     await repository.destroy(USERS, userId);
//     emitter().emit(USERS_DELETED, userId);
// };

// , update, findById, find, finds, destroy
