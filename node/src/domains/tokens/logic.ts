import jwt from "@/helpers/jwt";
import repository, { TToken, TTokenType } from "./repository";

export const generateToken = async (type: TTokenType, payload: object, expiresInHours?: number): Promise<TToken> => {
    const token = await jwt.generate(payload, expiresInHours);
    return await repository.insert(type, token);
};
