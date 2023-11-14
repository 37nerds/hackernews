import { TToken, TTokenType } from "./repository";

import jwt from "@/helpers/jwt";
import repository from "./repository";

export const generate_token = async (type: TTokenType, payload: object, expires_in_hours?: number): Promise<TToken> => {
    const token = await jwt.generate(payload, expires_in_hours);
    return await repository.insert({ type, token });
};
