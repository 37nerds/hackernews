import env from "@/config/env";
import bcrypt from "bcrypt";

const salt_rounds = env.CRYPTO_SALT_ROUNDS;

const crypto = {
    hash: async (text: string): Promise<string> => {
        return new Promise((resolve, reject) => {
            bcrypt.hash(text, salt_rounds, (err, hash) => {
                if (err) reject(err);
                else resolve(hash);
            });
        });
    },
    compare: async (hash: string, text: string): Promise<boolean> => {
        return new Promise((resolve, reject) => {
            bcrypt.compare(text, hash, (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },
};

export default crypto;
