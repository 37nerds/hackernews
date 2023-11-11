import bRepository, { TDocBase } from "@/base/repository";

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

const repository = {
    insert,
};

export default repository;
