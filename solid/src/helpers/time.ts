import d from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

d.extend(relativeTime);

export const display_from_now = (time: string) => d(time).fromNow();
export const format_to_param_date = (time: number) => d(time).format("YYYY-MM-DD");
export const format_to_disply_date = (time: number | string) => d(time).format("MMMM D, YYYY");
export const add_days = (time: number | string, days: number = 1) => d(time).add(days, "day");
export const add_months = (time: number | string, months: number = 1) => d(time).add(months, "month");
export const add_years = (time: number | string, days: number = 1) => d(time).add(days, "year");
export const previous_days = (time: number | string, days: number = 1) => d(time).subtract(days, "day");
export const previous_months = (time: number | string, months: number = 1) => d(time).subtract(months, "month");
export const previous_years = (time: number | string, days: number = 1) => d(time).subtract(days, "year");
export const is_getter_then_now = (time: number | string) => d(time).isAfter(d());
