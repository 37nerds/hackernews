export type TSetValue = (value: string) => void;
export type TErrorRecord = Record<string, string>;
export type TError = {
    name: string;
    message: string;
    errors?: TErrorRecord;
};
