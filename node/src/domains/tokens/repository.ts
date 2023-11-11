import bRepository, { TDocBase } from "@/base/repository";
import { Filter, Document } from "mongodb";

export type TTokenType = "forgot-password";

type TTokenInsert = {
    type: TTokenType;
    token: string;
    invalid: boolean; // default: false
};

export type TToken = TDocBase & TTokenInsert;

const TOKENS = "tokens";

const insert = async (type: TTokenType, token: string): Promise<TToken> => {
    return await bRepository.insert<TTokenInsert, TToken>(TOKENS, {
        type,
        token,
        invalid: false,
    });
};

const find = async (filter: Filter<Document>): Promise<TToken> => {
    return await bRepository.find<TToken>(TOKENS, filter);
};

const findByToken = async (token: string): Promise<TToken> => {
    return await find({ token });
};

const repository = {
    insert,
    find,
    findByToken,
};

export default repository;
