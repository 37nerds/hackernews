import type { TBaseDoc, TFilter } from "@/base/repo";
import repo from "@/base/repo";

export type TTokenType = "forgot-password";

export type TToken = TBaseDoc & {
    type: TTokenType;
    token: string;
    invalid: boolean;
};

const TOKENS = "tokens";

const token_repository = {
    insert: (doc: { type: TTokenType; token: string }) => {
        return repo.insert<{ type: TTokenType; token: string; invalid: boolean }, TToken>(TOKENS, {
            ...doc,
            invalid: false,
        });
    },
    find: (filter: TFilter) => {
        return repo.find<TToken>(TOKENS, filter);
    },
    find_by_token: (token: string) => {
        return token_repository.find({ token });
    },
    update: (id: string, doc: { invalid: boolean }) => {
        return repo.update<{ invalid: boolean }, TToken>(TOKENS, id, doc);
    },
};

export default token_repository;
