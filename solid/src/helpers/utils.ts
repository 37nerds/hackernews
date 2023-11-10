export const convertBooleanToYesNo = (value: boolean): "yes" | "no" => {
    return value ? "yes" : "no";
};

export const convertYesNoToBoolean = (value: string): boolean => {
    return value === "yes";
};
