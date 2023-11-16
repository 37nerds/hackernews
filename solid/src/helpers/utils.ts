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
