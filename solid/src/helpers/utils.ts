import { NODE_ENV } from "@/config/env";

export const convert_boolean_to_yes_no = (value: boolean): "yes" | "no" => {
    return value ? "yes" : "no";
};

export const convert_yes_no_to_boolean = (value: string): boolean => {
    return value === "yes";
};

export const extract_domain_from_url = (url: string): string => {
    const domainRegex = /^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:/\n?]+)?/;
    const match = url.match(domainRegex);
    return match ? match[1] || "" : "";
};

export const timeout = <T>(fn: Function, time: number = 1000): Promise<T> => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(fn());
        }, time);
    });
};

export const is_dev = () => NODE_ENV === "dev";
export const is_prod = () => NODE_ENV === "prod";
