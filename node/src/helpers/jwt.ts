import type { JwtPayload } from "jsonwebtoken";

import env from "@/config/env";
import jsonwebtoken from "jsonwebtoken";

const secret_key = env.JWT_SECRET_KEY;

const jwt = {
    generate: async (payload: object, expires_in_hours: number = 1): Promise<string> => {
        return new Promise((resolve, reject) => {
            jsonwebtoken.sign(payload, secret_key, { expiresIn: `${expires_in_hours}h` }, (e, token) => {
                if (e) return reject(e);
                if (!token) return reject(new Error("token is undefined"));
                return resolve(token);
            });
        });
    },
    verify: async (token: string): Promise<JwtPayload | string> => {
        return new Promise((resolve, reject) => {
            jsonwebtoken.verify(token, secret_key, (e, decoded) => {
                if (e) return reject(e);
                if (!decoded) return reject(new Error("decoded value is undefined"));
                return resolve(decoded);
            });
        });
    },
};

export default jwt;
