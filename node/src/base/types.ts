import type { Faker } from "@faker-js/faker";

export type TStatus = 200 | 500 | 400 | 404 | 201 | 204;
export type TNodeEnv = "dev" | "prod";
export type TErrorRecord = Record<string, string>;
export type TError = {
    name: string;
    message: string;
    errors?: TErrorRecord;
    stack?: string;
};

export type TFaker = Faker;
