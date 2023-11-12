import type { Filter, Document } from "mongodb";
import type { TBaseDoc } from "@/base/repository";

import repository from "@/base/repository";

const TOKENS = "tokens";

export type TTokenType = "forgot-password";

export type TTokenInsert = {
    type: TTokenType;
    token: string;
    invalid: boolean;
};

export type TTokenUpdate = {
    invalid: boolean;
};

export type TToken = TBaseDoc & TTokenInsert;

const token_repository = {
    insert: (type: TTokenType, token: string): Promise<TToken> => {
        return repository.insert<TTokenInsert, TToken>(TOKENS, {
            type,
            token,
            invalid: false,
        });
    },
    find: (filter: Filter<Document>): Promise<TToken> => {
        return repository.find<TToken>(TOKENS, filter);
    },
    find_by_token: (token: string): Promise<TToken> => {
        return token_repository.find({ token });
    },
    update: (token_id: string, doc: TTokenUpdate): Promise<TToken> => {
        return repository.update<TTokenUpdate, TToken>(TOKENS, token_id, doc);
    },
};

export default token_repository;
