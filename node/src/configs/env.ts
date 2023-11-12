import "dotenv/config";

import type { TNodeEnv } from "@/base/types";

const le = (n: string, d = ""): string => process.env[n] || d;

type TEnv = {
    NODE_ENV: TNodeEnv;
    PORT: number;

    MONGO_URI: string;

    JWT_SECRET_KEY: string;
    CRYPTO_SALT_ROUNDS: number;

    SMTP_HOST: string;
    SMTP_PORT: number;
    SMTP_USERNAME: string;
    SMTP_PASSWORD: string;
};

const env: TEnv = {
    NODE_ENV: le("NODE_ENV", "prod") as TNodeEnv,
    PORT: Number(le("PORT", "8000")),

    MONGO_URI: le("MONGO_URI", "mongodb://127.0.0.1:27017/keep"),

    JWT_SECRET_KEY: le("JWT_SECRET_KEY", "simple secret key"),
    CRYPTO_SALT_ROUNDS: Number(le("CRYPTO_SALT_ROUNDS", "10")),

    SMTP_HOST: le("SMTP_HOST", "sandbox.smtp.mailtrap.io"),
    SMTP_PORT: Number(le("SMTP_PORT", "2525")),
    SMTP_USERNAME: le("SMTP_USERNAME", ""),
    SMTP_PASSWORD: le("SMTP_PASSWORD", ""),
};

export default env;
